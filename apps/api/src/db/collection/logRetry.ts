import dbbClient from '../db/ddbClient.js'
import { retryLogTable } from '../../config/constants.js'
import CustomError from '../../middlewares/error/customError.js'
import { RetryLog, RetryStatus } from '../../types/collection.js'

export default async (userID: string): Promise<void> => {
  const params = {
    TableName: retryLogTable,
    Key: {
      userID: userID,
    },
  }
  const existingRecord = await dbbClient.get(params)

  if (existingRecord.Item) {
    const { retryStatus, retryCount, updatedAt } = existingRecord.Item as RetryLog

    if (retryStatus === RetryStatus.Started) {
      throw new CustomError(400, 'Retry already in progress.')
    }

    if (updatedAt + 1000 * 60 * 60 * 24 > Date.now()) {
      throw new CustomError(400, 'Cannot retry within 24 hours of last attempt.')
    }

    const updateParams = {
      TableName: retryLogTable,
      Key: {
        userID: userID,
      },
      UpdateExpression: 'set retryStatus = :s, retryCount = retryCount + :c, updatedAt = :t',
      ExpressionAttributeValues: {
        ':s': RetryStatus.Started,
        ':c': 1,
        ':t': Date.now(),
      },
    }

    await dbbClient.update(updateParams)
  } else {
    const newLog = {
      userID: userID,
      retryStatus: RetryStatus.Started,
      retryCount: 1,
      successCount: 0,
      failedCount: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }

    const putParams = {
      TableName: retryLogTable,
      Item: newLog,
    }

    await dbbClient.put(putParams)
  }
}
