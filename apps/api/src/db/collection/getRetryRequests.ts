import dbbClient from '../db/ddbClient.js'
import { retryLogTable } from '../../config/constants.js'
import logger from '../../utils/logger.js'
import CustomError from '../../middlewares/error/customError.js'
import { RetryLog, RetryStatus } from '../../types/collection.js'

export default async (): Promise<RetryLog[]> => {
  try {
    const params = {
      TableName: retryLogTable,
      IndexName: 'retryStatus-index',
      KeyConditionExpression: 'retryStatus = :s',
      ExpressionAttributeValues: {
        ':s': RetryStatus.Started,
      },
      ScanIndexForward: false,
    }

    const record = await dbbClient.query(params)
    return (record.Items as RetryLog[]) ?? []
  } catch (error: any) {
    logger.error(`Error in getting retry requests: ${error}`)
    throw new CustomError(500, `Internal Server Error.`)
  }
}
