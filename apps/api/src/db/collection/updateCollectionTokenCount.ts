import dbbClient from '../db/ddbClient.js'
import { collectionTable } from '../../config/constants.js'
import logger from '../../utils/logger.js'
import CustomError from '../../middlewares/error/customError.js'

export default async (collectionID: string, dataToAdd: number): Promise<void> => {
  try {
    const params = {
      TableName: collectionTable,
      Key: {
        collectionID,
      },
      UpdateExpression: 'set tokenCount = tokenCount + :t, updatedAt = :u',
      ExpressionAttributeValues: {
        ':t': dataToAdd,
        ':u': Date.now(),
      },
    }

    await dbbClient.update(params)
  } catch (error: any) {
    logger.error(`Error updating user data limit: ${error}`)
    throw new CustomError(500, `Internal Server Error.`)
  }
}
