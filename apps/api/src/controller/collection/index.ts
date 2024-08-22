import { type NextFunction, type Request, type Response } from 'express'

import {
  saveTokenRecords,
  createCollection,
  parseCSV,
  parseJSON,
  shipCidsToLighthouse,
  dealStatus,
} from './helper/index.js'
import responseParser from '../../utils/responseParser.js'
import listCollections from '../../db/collection/listCollections.js'
import collectionDetails from '../../db/collection/collectionDetails.js'
import CustomError from '../../middlewares/error/customError.js'
import getTokens from '../../db/collection/getTokens.js'
import updateTokenCount from '../../db/user/updateTokenCount.js'
import updateCollectionTokenCount from '../../db/collection/updateCollectionTokenCount.js'
import getTokenById from '../../db/collection/getTokenById.js'

export const create_collection = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const collection = await createCollection(
      req.body.user.userID,
      req.body.collectionName,
      req.body.contractAddress,
      req.body.chainID,
      req.body.network,
    )
    const data = responseParser({
      message: 'Collection created.',
      collectionID: collection,
    })
    res.status(200).json(data)
  } catch (error) {
    next(error)
  }
}

export const list_collections = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const collectionsById = await listCollections(req.body.user.userID)
    const data = responseParser(collectionsById)
    res.status(200).json(data)
  } catch (error) {
    next(error)
  }
}

export const collection_info = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const singleCollection = await collectionDetails(req.query.collectionID as string)
    const data = responseParser(singleCollection)
    res.status(200).json(data)
  } catch (error) {
    next(error)
  }
}

export const list_tokens = async (req: any, res: Response, next: NextFunction) => {
  try {
    const collectionInfo = await collectionDetails(req.query.collectionID as string)
    if (collectionInfo?.userID !== req.body.user.userID) {
      throw new CustomError(403, 'Forbidden.')
    }

    let exclusiveStartKey = undefined
    if (req.query.lastKey) {
      const tokenDetails = await getTokenById(req.query.lastKey)
      if (tokenDetails) {
        exclusiveStartKey = {
          id: tokenDetails.id,
          collectionID: tokenDetails.collectionID,
          createdAt: tokenDetails.createdAt,
        }
      }
    }
    const tokens = await getTokens(req.query.collectionID, exclusiveStartKey)
    const data = responseParser(tokens)
    res.status(200).json(data)
  } catch (error) {
    next(error)
  }
}

export const deal_status = async (req: any, res: Response, next: NextFunction) => {
  try {
    const deals = await dealStatus(req.query.cid)
    const data = responseParser(deals)
    res.status(200).json(data)
  } catch (error) {
    next(error)
  }
}

export const add_tokens = async (req: any, res: Response, next: NextFunction) => {
  try {
    if (!req.file || !req.body.collectionID) {
      throw new CustomError(400, 'Token file or collectionID missing.')
    }

    const collectionInfo = await collectionDetails(req.body.collectionID)
    if (!collectionInfo || collectionInfo?.userID !== req.body.user.userID) {
      throw new CustomError(403, 'Forbidden.')
    }

    const fileData = req.file.buffer
    const parsedData =
      req.file.mimetype === 'text/csv'
        ? await parseCSV(fileData, req.body.network)
        : await parseJSON(fileData, req.body.network)
    const _ = await saveTokenRecords(parsedData.results, req.body.collectionID, req.body.user.userID)
    await updateTokenCount(req.body.user.userID, parsedData.results.length)
    await updateCollectionTokenCount(req.body.collectionID, parsedData.results.length)
    await shipCidsToLighthouse(parsedData.results)
    if (parsedData.rejected.length > 0) {
      throw new CustomError(400, `${parsedData.rejected.length} tokens rejected due to invalid CID or tokenID.`)
    }
    const data = responseParser(`${parsedData.results.length} tokens added.`)
    res.status(200).json(data)
  } catch (error) {
    next(error)
  }
}

// export const token_status = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const tokenStatus = await getTokenStatus(
//       req.query.collectionID as string,
//       req.query.tokenID as string
//     )
//     const data = responseParser(tokenStatus)
//     res.status(200).json(data)
//   } catch (error) {
//     next(error)
//   }
// }
