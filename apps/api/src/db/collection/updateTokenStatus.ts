import dbbClient from '../db/ddbClient.js'
import { tokenTable } from '../../config/constants.js'
import logger from '../../utils/logger.js'
import CustomError from '../../middlewares/error/customError.js'

export default async (id: string, tokenStatus: string, fileSize: number): Promise<void> => {
  try {
    const params = {
      TableName: tokenTable,
      Key: {
        id,
      },
      UpdateExpression: 'set dealStatus = :d, fileSize = :f, updatedAt = :u',
      ExpressionAttributeValues: {
        ':d': tokenStatus,
        ':f': fileSize,
        ':u': Date.now(),
      },
    }

    await dbbClient.update(params)
  } catch (error: any) {
    logger.error(`Error updating token status: ${error}`)
    throw new CustomError(500, `Internal Server Error.`)
  }
}
