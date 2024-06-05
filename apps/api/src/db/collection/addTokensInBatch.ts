import dbbClient from '../db/ddbClient.js'
import { tokenTable } from '../../config/constants.js'
import logger from '../../utils/logger.js'
import CustomError from '../../middlewares/error/customError.js'

export default async (putRequests: any): Promise<void> => {
  try {
    const params = {
      RequestItems: {
        [tokenTable]: putRequests,
      },
    }
    await dbbClient.batchWrite(params)
  } catch (error: any) {
    logger.error(`Error writing items in batch: ${error}`)
    throw new CustomError(500, `Internal Server Error.`)
  }
}
