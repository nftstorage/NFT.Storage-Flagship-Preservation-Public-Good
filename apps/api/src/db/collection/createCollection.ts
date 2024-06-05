import dbbClient from '../db/ddbClient.js'
import { Collection } from '../../types/collection.js'
import { collectionTable } from '../../config/constants.js'
import logger from '../../utils/logger.js'
import CustomError from '../../middlewares/error/customError.js'

export default async (collectionDetails: Collection): Promise<void> => {
  try {
    const params = {
      TableName: collectionTable,
      Item: collectionDetails,
    }

    await dbbClient.put(params)
  } catch (error: any) {
    logger.error(`Error in creating collection: ${error}`)
    throw new CustomError(500, `Internal Server Error.`)
  }
}
