import dbbClient from '../db/ddbClient.js'
import { tokenTable } from '../../config/constants.js'
import logger from '../../utils/logger.js'
import CustomError from '../../middlewares/error/customError.js'

type Token = {
  id: string
  cid: string
  tokenID: string
  dealStatus: string
  fileSize: number
  collectionID: string
  userID: string
  createdAt: number
  updatedAt: number
}

export default async (cid: string): Promise<Token[]> => {
  try {
    const params = {
      TableName: tokenTable,
      IndexName: 'cid-index',
      KeyConditionExpression: 'cid = :cid',
      ExpressionAttributeValues: {
        ':cid': cid
      }
    }

    const result = await dbbClient.query(params)
    return result.Items as Token[]
  } catch (error: any) {
    logger.error(`Error in getting token by CID: ${error}`)
    throw new CustomError(500, `Internal Server Error.`)
  }
}
