import dbbClient from '../../db/ddbClient.js'
import { authTable } from '../../../config/constants.js'
import logger from '../../../utils/logger.js'
import CustomError from '../../../middlewares/error/customError.js'

type APIKeyList = {
  keyID: string
  keyName: string
  userRole: string
  createdAt: number
  lastUsed: number
}

export default async (userId: string): Promise<APIKeyList[]> => {
  try {
    const params = {
      TableName: authTable,
      IndexName: 'userID-index',
      KeyConditionExpression: 'userID = :u',
      ExpressionAttributeValues: {
        ':u': userId,
      },
      ProjectionExpression: 'keyID, keyName, userRole, createdAt, lastUsed',
    }

    const record = await dbbClient.query(params)
    const Items = record.Items ?? []
    return Items as APIKeyList[]
  } catch (error: any) {
    logger.error(`Error getting all keys: ${error}`)
    throw new CustomError(500, `Internal Server Error.`)
  }
}
