import dbbClient from '../../db/ddbClient.js'
import { APIKey } from '../../../types/user.js'
import { authTable } from '../../../config/constants.js'
import logger from '../../../utils/logger.js'
import CustomError from '../../../middlewares/error/customError.js'

export default async (keyDetails: APIKey): Promise<void> => {
  try {
    const params = {
      TableName: authTable,
      Item: keyDetails,
    }

    await dbbClient.put(params)
  } catch (error: any) {
    logger.error(`Error in create api key record: ${error}`)
    throw new CustomError(500, `Internal Server Error.`)
  }
}
