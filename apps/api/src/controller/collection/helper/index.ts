import { v4 as uuidv4 } from 'uuid'
import csv from 'csv-parser'
import { Readable } from 'stream'
import * as isIPFS from 'is-ipfs'

import config from '../../../config/index.js'
import logger from '../../../utils/logger.js'
import { TokenStatus, TokenObject, LighthouseCIDStatus } from '../../../types/collection.js'
import { filecoinFirstURL, lighthouseAPIURL } from '../../../config/constants.js'
import addTokensInBatch from '../../../db/collection/addTokensInBatch.js'
import createCollectionRecord from '../../../db/collection/createCollection.js'
import getTokensByDealStatus from '../../../db/collection/getTokensByDealStatus.js'
import updateTokenStatus from '../../../db/collection/updateTokenStatus.js'
import updateCollectionCount from '../../../db/user/updateCollectionCount.js'
import updateUserDataUsed from '../../../db/user/updateUserDataUsed.js'
import getBalance from '../../../db/user/getBalance.js'
import CustomError from '../../../middlewares/error/customError.js'
import deleteTokenRecords from '../../../db/collection/deleteTokenRecords.js'
import getTokenByCid from '../../../db/collection/getTokenByCid.js'
import getTokenById from '../../../db/collection/getTokenById.js'
import updateCollectionTokenCount from '../../../db/collection/updateCollectionTokenCount.js'
import collectionDetails from '../../../db/collection/collectionDetails.js'
import updateTokenCount from '../../../db/user/updateTokenCount.js'
import logRetry from '../../../db/collection/logRetry.js'
import getRetryRequests from '../../../db/collection/getRetryRequests.js'
import getTokensByUserID from '../../../db/collection/getTokensByUserID.js'
import updateRetryLog from '../../../db/collection/updateRetryLog.js'

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
        let objectID = ''
        let cid = ''
        Object.keys(data).forEach((key) => {
          if (network === 'solana' && key.toLowerCase().includes('tokenaddress')) {
            tokenAddress = data[key]
          } else if (network === 'sui' && key.toLowerCase().includes('objectID')) {
            objectID = data[key]
          } else if (key.toLowerCase().includes('tokenid')) {
            tokenID = data[key]
          } else if (key.toLowerCase().includes('cid')) {
            cid = data[key].trim()
          }
        })
        if (isIPFS.cid(cid) && (tokenID || tokenAddress || objectID)) {
          results.push({ tokenID: network === 'solana' ? tokenAddress : network === 'sui' ? objectID : tokenID, cid })
        } else {
          rejected.push({ tokenID: network === 'solana' ? tokenAddress : network === 'sui' ? objectID : tokenID, cid })
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
        const tokenID = network === 'solana' ? item.tokenAddress : network === 'sui' ? item.objectID : item.tokenID
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

export const saveTokenRecords = async (
  tokens: TokenObject[],
  collectionID: string,
  userID: string,
): Promise<{ newTokens: TokenObject[]; duplicateTokens: TokenObject[] }> => {
  const timestamp = Date.now()
  const newTokens: TokenObject[] = []
  const duplicateTokens: TokenObject[] = []

  // Create a Set to track CIDs within the incoming batch
  const seenCids = new Set<string>()

  // First, check for duplicates within the incoming tokens
  tokens.forEach((token: TokenObject) => {
    if (seenCids.has(token.cid)) {
      duplicateTokens.push(token)
    } else {
      seenCids.add(token.cid)
    }
  })

  // Then check against existing records in the database
  const checkDuplicatePromises = tokens.map(async (token: TokenObject) => {
    if (duplicateTokens.some((t) => t.cid === token.cid)) {
      return
    }

    const existingToken = await getTokenByCid(token.cid)
    let isDuplicate = false
    for (let i = 0; i < existingToken.length; i++) { 
      if (existingToken[i].userID === userID) {
        isDuplicate = true
        break
      }
    }
    if (!isDuplicate) {
      newTokens.push(token)
    } else {
      duplicateTokens.push(token)
    }
  })

  await Promise.all(checkDuplicatePromises)

  const putRequests = tokens.map((token: TokenObject) => {
    const tokenDetails = {
      id: uuidv4(),
      tokenID: String(token.tokenID),
      cid: String(token.cid),
      dealStatus: duplicateTokens.some((t) => t.cid === token.cid) ? TokenStatus.Duplicate : TokenStatus.Started,
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
  })

  for (let i = 0; i < putRequests.length; i += 25) {
    await addTokensInBatch(putRequests.slice(i, i + 25))
  }

  return { newTokens, duplicateTokens }
}

const sendRetryRequest = async (cid: string): Promise<null> => {
  const response = await fetch(`${filecoinFirstURL}/api/v1/pin/retry_pin?cid=${cid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.lighthouse_api_key}`,
    },
  })
  if (!response.ok) {
    logger.error('Error sending retry request for cid: ' + cid)
  }
  return null
}

export const retryFailedTokenRecords = async (userID: string): Promise<null> => {
  const tokenRecords = await getTokensByUserID(userID)
  let failedCount = 0
  for (let i = 0; i < tokenRecords.length; i++) {
    if (tokenRecords[i].dealStatus === TokenStatus.PinningFailed) {
      await updateTokenStatus(tokenRecords[i].id, TokenStatus.Retry, tokenRecords[i].fileSize)
      await sendRetryRequest(tokenRecords[i].cid)
      failedCount++
    }
  }
  if (failedCount > 0) {
    await logRetry(userID)
  }
  return null
}

export const deleteFailedTokenRecords = async (tokenID: string, userID: string): Promise<null> => {
  const tokenRecord = await getTokenById(tokenID)
  if (tokenRecord.dealStatus === TokenStatus.Complete || tokenRecord.dealStatus === TokenStatus.InQueue) {
    throw new CustomError(400, 'Token is already in queue or completed.')
  }
  if (tokenRecord.userID !== userID) {
    throw new CustomError(403, 'You are not authorized to delete this token.')
  }
  // Update collection token count
  const collectionInfo = await collectionDetails(tokenRecord.collectionID)
  await updateCollectionTokenCount(collectionInfo.collectionID, -1)

  // update user token count
  await updateTokenCount(userID, -1)

  // Delete token record
  await deleteTokenRecords(tokenID)
  return null
}

const checkDataLimit = async (userID: string, fileSize: number) => {
  const userBalance = await getBalance(userID)
  if(userBalance.dataLimit - userBalance.dataUsed < fileSize) {
    return true
  }
  return false
}

export const refreshFileStatus = async () => {
  const cidList = await getTokensByDealStatus(TokenStatus.Started)
  console.log(cidList.length)
  
  // Process in batches of 10 concurrent requests
  const batchSize = 50
  for (let i = 0; i < cidList.length; i += batchSize) {
    const batch = cidList.slice(i, i + batchSize)
    const promises = batch.map(async (token) => {
      const response = await fetch(`${filecoinFirstURL}/api/v1/pin/cid_details?cid=${token.cid}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${config.lighthouse_api_key}`,
        },
      })
      
      if (response.ok) {
        const resp = await response.json()
        if(!resp.value) {
          return
        }
        const data = resp.value
        if (data.cidStatus === LighthouseCIDStatus.Queued || 
            data.cidStatus === LighthouseCIDStatus.PinningStarted || 
            data.cidStatus === LighthouseCIDStatus.UserDeleted) {
          return
        }

        if (data.cidStatus === LighthouseCIDStatus.PinningFailed) {
          await updateTokenStatus(token.id, TokenStatus.PinningFailed, parseInt(data.fileSize))
          return
        }

        if (data.cidStatus === LighthouseCIDStatus.Pinned || 
            data.cidStatus === LighthouseCIDStatus.DealMakingStarted) {
          const isDataLimitExceed = await checkDataLimit(token.userID, parseInt(data.fileSize))
          if (isDataLimitExceed) {
            await updateTokenStatus(token.id, TokenStatus.DataCapExceed, parseInt(data.fileSize))
            await updateUserDataUsed(token.userID, parseInt(data.fileSize))
            await fetch(`${filecoinFirstURL}/api/v1/pin/delete_cid?cid=${token.cid}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${config.lighthouse_api_key}`,
              },
            })
          } else {
            await updateTokenStatus(token.id, TokenStatus.InQueue, parseInt(data.fileSize))
            await updateUserDataUsed(token.userID, parseInt(data.fileSize))
          }
        }

        if (data.cidStatus === LighthouseCIDStatus.Complete) {
          await updateTokenStatus(token.id, TokenStatus.Complete, parseInt(data.fileSize))
          await updateUserDataUsed(token.userID, parseInt(data.fileSize))
        }
      }
    })

    // Wait for all promises in the current batch to complete
    await Promise.all(promises)
    console.log(`Processed batch ${i / batchSize + 1}`)
  }
}

export const refreshDealStatus = async () => {
  const cidList = await getTokensByDealStatus(TokenStatus.InQueue)
  
  // Process in batches of 50 concurrent requests
  const batchSize = 50
  for (let i = 0; i < cidList.length; i += batchSize) {
    const batch = cidList.slice(i, i + batchSize)
    const promises = batch.map(async (token) => {
      const response = await fetch(`${lighthouseAPIURL}/api/lighthouse/deal_status?cid=${token.cid}`)
      if (response.ok) {
        const values = await response.json()
        if (values.cidStatus === LighthouseCIDStatus.Complete) {
          await updateTokenStatus(token.id, TokenStatus.Complete, token.fileSize)
        }
      }
    })

    // Wait for all promises in the current batch to complete
    await Promise.all(promises)
    console.log(`Processed deal status batch ${i / batchSize + 1}`)
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

export const refreshRetryTokenRecords = async () => {
  const requests = await getRetryRequests()
  for (let i = 0; i < requests.length; i++) {
    const tokens = await getTokensByUserID(requests[i].userID)
    let successCount = 0
    let failedCount = 0
    for (let j = 0; j < tokens.length; j++) {
      const response = await fetch(`${filecoinFirstURL}/api/v1/pin/cid_details?cid=${tokens[j].cid}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${config.lighthouse_api_key}`,
        },
      })
      if (response.ok) {
        const resp = await response.json()
        const value = resp.value
        if (value.cidStatus === 'pinned' || value.cidStatus === 'deal-making-started' || value.cidStatus === 'complete') {
          await updateTokenStatus(tokens[j].id, TokenStatus.InQueue, parseInt(value.fileSize))
          await updateUserDataUsed(tokens[j].userID, parseInt(value.fileSize))
          successCount++
        } else {
          if (value.cidStatus === 'pinning-failed') {
            await updateTokenStatus(tokens[j].id, TokenStatus.PinningFailed, parseInt(value.fileSize))
            failedCount++
          }
        }
      }
    }
    await updateRetryLog(requests[i].userID, successCount, failedCount)
  }
}
