import dbbClient from '../../db/ddbClient.js'
import { authTable } from '../../../config/constants.js'
import logger from '../../../utils/logger.js'
import CustomError from '../../../middlewares/error/customError.js'

type GetKeyRecordByHash = {
  keyID: string
  keyHash: string
  keyName: string
  userID: string
  userRole: string
  lastUsed: number
}

export default async (keyhash: string): Promise<GetKeyRecordByHash> => {
  try {
    const params = {
      TableName: authTable,
      IndexName: 'keyHash-index',
      KeyConditionExpression: 'keyHash = :k',
      ExpressionAttributeValues: {
        ':k': keyhash,
      },
      ProjectionExpression: 'keyID, keyName, keyHash, userID, userRole, lastUsed',
    }

    const record = await dbbClient.query(params)
    const Items = record.Items ?? []
    if (Items.length === 0) {
      throw new CustomError(404, `Key record not found.`)
    }
    return Items[0] as GetKeyRecordByHash
  } catch (error: any) {
    logger.error(`Error in fetch key record: ${error}`)
    throw new CustomError(401, `Unauthorized: Invalid access token.`)
  }
}
