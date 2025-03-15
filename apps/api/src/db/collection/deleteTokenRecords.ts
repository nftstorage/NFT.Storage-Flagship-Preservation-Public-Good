import dbbClient from '../db/ddbClient.js'
import { tokenTable } from '../../config/constants.js'
import logger from '../../utils/logger.js'
import CustomError from '../../middlewares/error/customError.js'

export default async (tokenID: string): Promise<null> => {
  try {
    const params = {
      TableName: tokenTable,
      Key: {
        id: tokenID,
      },
    }

    await dbbClient.delete(params)
    return null
  } catch (error: any) {
    logger.error(`Error deleting tokens: ${error}`)
    throw new CustomError(500, 'Failed to delete tokens')
  }
}
