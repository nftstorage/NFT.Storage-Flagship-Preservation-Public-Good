import dbbClient from '../db/ddbClient.js'
import { usersTable } from '../../config/constants.js'
import logger from '../../utils/logger.js'
import CustomError from '../../middlewares/error/customError.js'

export default async (userID: string): Promise<void> => {
  try {
    const params = {
      TableName: usersTable,
      Key: {
        userID,
      },
      UpdateExpression: 'set marketingEmail = :m, updatedAt = :u',
      ExpressionAttributeValues: {
        ':m': true,
        ':u': Date.now(),
      },
    }

    await dbbClient.update(params)
  } catch (error: any) {
    logger.error(`Error accepting marketing mail: ${error}`)
    throw new CustomError(500, `Internal Server Error.`)
  }
}
