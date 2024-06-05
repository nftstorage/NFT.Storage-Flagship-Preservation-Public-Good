import dbbClient from '../db/ddbClient.js'
import { collectionTable } from '../../config/constants.js'
import logger from '../../utils/logger.js'
import CustomError from '../../middlewares/error/customError.js'

type CollectionList = {
  collectionID: string
  collectionName: string
  contractAddress: string
  chainID: string
  blockchainNet: string
  createdAt: number
}

export default async (userID: string): Promise<CollectionList[]> => {
  try {
    const params = {
      TableName: collectionTable,
      IndexName: 'userID-createdAt-index',
      KeyConditionExpression: 'userID = :u',
      ExpressionAttributeValues: {
        ':u': userID,
      },
      ProjectionExpression: 'collectionID, collectionName, contractAddress, chainID, blockchainNet, createdAt',
    }

    const record = await dbbClient.query(params)
    return (record.Items as CollectionList[]) ?? []
  } catch (error: any) {
    logger.error(`Error in listing collection: ${error}`)
    throw new CustomError(500, `Internal Server Error.`)
  }
}
