import dbbClient from '../../db/ddbClient.js'
import { authTable } from '../../../config/constants.js'
import logger from '../../../utils/logger.js'
import CustomError from '../../../middlewares/error/customError.js'

export default async (keyID: string): Promise<void> => {
  try {
    const params = {
      TableName: authTable,
      Key: {
        keyID,
      },
      UpdateExpression: 'set lastUsed = :l',
      ExpressionAttributeValues: {
        ':l': Date.now(),
      },
    }

    await dbbClient.update(params)
  } catch (error: any) {
    logger.error(`Error updating github username: ${error}`)
    throw new CustomError(500, `Internal Server Error.`)
  }
}
