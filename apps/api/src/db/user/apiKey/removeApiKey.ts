import dbbClient from '../../db/ddbClient.js'
import { authTable } from '../../../config/constants.js'
import logger from '../../../utils/logger.js'
import CustomError from '../../../middlewares/error/customError.js'

export default async (id: string): Promise<void> => {
  try {
    const params = {
      TableName: authTable,
      Key: {
        keyID: id,
      },
    }

    await dbbClient.delete(params)
  } catch (error: any) {
    logger.error(`Error in remove api key: ${error}`)
    throw new CustomError(500, `Internal Server Error.`)
  }
}
