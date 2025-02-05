import dbbClient from '../db/ddbClient.js'
import { retryLogTable } from '../../config/constants.js'
import logger from '../../utils/logger.js'
import CustomError from '../../middlewares/error/customError.js'
import { RetryStatus } from '../../types/collection.js'

export default async (userID: string, successCount: number, failedCount: number): Promise<void> => {
  try {
    const params = {
      TableName: retryLogTable,
      Key: {
        userID,
      },
      UpdateExpression: 'set retryStatus = :s, successCount = :sc, failedCount = :fc, updatedAt = :u',
      ExpressionAttributeValues: {
        ':s': RetryStatus.Done,
        ':sc': successCount,
        ':fc': failedCount,
        ':u': Date.now(),
      },
    }

    await dbbClient.update(params)
  } catch (error: any) {
    logger.error(`Error updating user data limit: ${error}`)
    throw new CustomError(500, `Internal Server Error.`)
  }
}
