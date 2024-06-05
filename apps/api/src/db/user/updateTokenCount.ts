import dbbClient from '../db/ddbClient.js'
import { usersTable } from '../../config/constants.js'
import logger from '../../utils/logger.js'
import CustomError from '../../middlewares/error/customError.js'

export default async (userID: string, dataToAdd: number): Promise<void> => {
  try {
    const params = {
      TableName: usersTable,
      Key: {
        userID,
      },
      UpdateExpression: 'set tokenCount = tokenCount + :t, updatedAt = :u',
      ExpressionAttributeValues: {
        ':t': dataToAdd,
        ':u': Date.now(),
      },
    }

    await dbbClient.update(params)
  } catch (error: any) {
    logger.error(`Error updating token count user table: ${error}`)
    throw new CustomError(500, `Internal Server Error.`)
  }
}
