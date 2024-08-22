import { v4 as uuidv4 } from 'uuid'
import csv from 'csv-parser'
import { Readable } from 'stream'
import * as isIPFS from 'is-ipfs'

import config from '../../../config/index.js'
import logger from '../../../utils/logger.js'
import { TokenStatus, TokenObject } from '../../../types/collection.js'
import { filecoinFirstURL, lighthouseAPIURL } from '../../../config/constants.js'
import addTokensInBatch from '../../../db/collection/addTokensInBatch.js'
import createCollectionRecord from '../../../db/collection/createCollection.js'
import getTokensByDealStatus from '../../../db/collection/getTokensByDealStatus.js'
import updateTokenStatus from '../../../db/collection/updateTokenStatus.js'
import updateCollectionCount from '../../../db/user/updateCollectionCount.js'
import updateUserDataUsed from '../../../db/user/updateUserDataUsed.js'
import getBalance from '../../../db/user/getBalance.js'
import CustomError from '../../../middlewares/error/customError.js'

export const createCollection = async (
  userID: string,
  collectionName: string,
  contractAddress: string,
  chainID: string,
  network: string,
): Promise<string> => {
  const timestamp = Date.now()
  const collectionID = uuidv4()
  const collectionDetails = {
    collectionID,
    userID,
    collectionName,
    contractAddress: contractAddress,
    chainID,
    blockchainNet: network,
    tokenCount: 0,
    createdAt: timestamp,
    updatedAt: timestamp,
  }

  await createCollectionRecord(collectionDetails)
  await updateCollectionCount(userID, 1)
  return collectionID
}

export const parseCSV = (
  csvData: Buffer,
  network: string,
): Promise<{ results: TokenObject[]; rejected: TokenObject[] }> => {
  return new Promise((resolve, reject) => {
    const results: TokenObject[] = []
    const rejected: TokenObject[] = []
    const stream = Readable.from(csvData)
    stream
      .pipe(csv())
      .on('data', (data) => {
        let tokenID = ''
        let tokenAddress = ''
        let cid = ''
        Object.keys(data).forEach((key) => {
          if (network === 'solana' && key.toLowerCase().includes('tokenaddress')) {
            tokenAddress = data[key]
          } else if (key.toLowerCase().includes('tokenid')) {
            tokenID = data[key]
          } else if (key.toLowerCase().includes('cid')) {
            cid = data[key]
          }
        })
        if (isIPFS.cid(cid) && (tokenID || tokenAddress)) {
          results.push({ tokenID: network === 'solana' ? tokenAddress : tokenID, cid })
        } else {
          rejected.push({ tokenID: network === 'solana' ? tokenAddress : tokenID, cid })
        }
      })
      .on('end', () => {
        resolve({ results, rejected })
      })
      .on('error', (error) => {
        reject(error)
      })
  })
}

export const parseJSON = (
  jsonData: Buffer,
  network: string,
): Promise<{ results: TokenObject[]; rejected: TokenObject[] }> => {
  return new Promise((resolve, reject) => {
    const results: TokenObject[] = []
    const rejected: TokenObject[] = []
    try {
      const data = JSON.parse(jsonData.toString())
      data.forEach((item: any) => {
        const tokenID = network === 'solana' ? item.tokenAddress : item.tokenID
        const cid = item.cid as string
        if (isIPFS.cid(cid) && tokenID) {
          results.push({ tokenID, cid })
        } else {
          rejected.push({ tokenID, cid })
        }
      })
      resolve({ results, rejected })
    } catch (error) {
      reject(error)
    }
  })
}

export const shipCidsToLighthouse = async (tokens: any) => {
  try {
    for (let i = 0; i < tokens.length; i++) {
      const response = await fetch(`${filecoinFirstURL}/api/v1/pin/add_cid?cid=${tokens[i].cid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${config.lighthouse_api_key}`,
        },
      })

      if (!response.ok) {
        logger.error('Error shiping cids to Lighthouse.')
      }
    }
  } catch (error) {
    logger.error('Lighthouse migration: ' + error)
  }
}

export const saveTokenRecords = async (tokens: any, collectionID: string, userID: string): Promise<string> => {
  const timestamp = Date.now()
  const putRequests = await Promise.all(
    tokens.map(async (token: any) => {
      const tokenDetails = {
        id: uuidv4(),
        tokenID: String(token.tokenID),
        cid: String(token.cid),
        dealStatus: TokenStatus.Started,
        fileSize: 0,
        collectionID: collectionID,
        userID: userID,
        createdAt: timestamp,
        updatedAt: timestamp,
      }
      return {
        PutRequest: {
          Item: tokenDetails,
        },
      }
    }),
  )
  for (let i = 0; i < putRequests.length; i += 25) {
    await addTokensInBatch(putRequests.slice(i, i + 25))
  }

  return 'Tokens added.'
}

export const refreshFileStatus = async () => {
  const userMap = new Map<string, { dataLimit: number; dataUsed: number }>()
  const cidList = await getTokensByDealStatus(TokenStatus.Started)
  for (let i = 0; i < cidList.length; i++) {
    const response = await fetch(`${filecoinFirstURL}/api/v1/pin/cid_details?cid=${cidList[i].cid}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${config.lighthouse_api_key}`,
      },
    })
    if (response.ok) {
      const resp = await response.json()
      const value = resp.value
      if (!value || value.cidStatus === 'queued' || value.cidStatus == 'pinning-started') {
        continue
      }
      if (value.cidStatus === 'pinning-failed') {
        await updateTokenStatus(cidList[i].id, TokenStatus.PinningFailed, parseInt(value.fileSize))
        continue
      }
      if (
        value.cidStatus === 'pinned' ||
        value.cidStatus === 'deal-making-started' ||
        value.cidStatus === 'de-removed'
      ) {
        if (userMap.has(cidList[i].userID)) {
          const usage = userMap.get(cidList[i].userID)
          if (!usage) {
            continue
          }
          usage.dataUsed += parseInt(value.fileSize)
          userMap.set(cidList[i].userID, { dataLimit: usage.dataLimit, dataUsed: usage.dataUsed })
          if (usage.dataLimit - usage.dataUsed < 0) {
            await updateTokenStatus(cidList[i].id, TokenStatus.DataCapExceed, parseInt(value.fileSize))
            await updateUserDataUsed(cidList[i].userID, parseInt(value.fileSize))
            await fetch(`${filecoinFirstURL}/api/v1/pin/delete_cid?cid=${cidList[i].cid}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${config.lighthouse_api_key}`,
              },
            })
          } else {
            await updateTokenStatus(cidList[i].id, TokenStatus.InQueue, parseInt(value.fileSize))
            await updateUserDataUsed(cidList[i].userID, parseInt(value.fileSize))
          }
        } else {
          const userBalance = await getBalance(cidList[i].userID)
          userBalance.dataUsed += parseInt(value.fileSize)
          userMap.set(cidList[i].userID, { dataLimit: userBalance.dataLimit, dataUsed: userBalance.dataUsed })
          if (userBalance.dataLimit - userBalance.dataUsed < 0) {
            await updateTokenStatus(cidList[i].id, TokenStatus.DataCapExceed, parseInt(value.fileSize))
            await updateUserDataUsed(cidList[i].userID, parseInt(value.fileSize))
            await fetch(`${filecoinFirstURL}/api/v1/pin/delete_cid?cid=${cidList[i].cid}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${config.lighthouse_api_key}`,
              },
            })
          } else {
            await updateTokenStatus(cidList[i].id, TokenStatus.InQueue, parseInt(value.fileSize))
            await updateUserDataUsed(cidList[i].userID, parseInt(value.fileSize))
          }
        }
      }
    }
  }
}

export const refreshDealStatus = async () => {
  const cidList = await getTokensByDealStatus(TokenStatus.InQueue)
  for (let i = 0; i < cidList.length; i++) {
    const response = await fetch(`${lighthouseAPIURL}/api/lighthouse/deal_status?cid=${cidList[i].cid}`)
    if (response.ok) {
      const values = await response.json()
      if (values.length > 0) {
        await updateTokenStatus(cidList[i].id, TokenStatus.Complete, cidList[i].fileSize)
      }
    }
  }
}

export const dealStatus = async (cid: string) => {
  if (!isIPFS.cid(cid)) {
    throw new CustomError(400, 'Invalid CID.')
  }
  const response = await fetch(`${lighthouseAPIURL}/api/lighthouse/deal_status?cid=${cid}`)
  if (!response.ok) {
    logger.error('Error getting deal status for cid: ' + cid)
    throw new CustomError(404, 'Deal status not found')
  }
  if (response.ok) {
    const values = await response.json()
    return values
  }
}

