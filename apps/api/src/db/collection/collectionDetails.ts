import dbbClient from '../db/ddbClient.js'
import { collectionTable } from '../../config/constants.js'
import { Collection } from '../../types/collection.js'
import logger from '../../utils/logger.js'
import CustomError from '../../middlewares/error/customError.js'

export default async (collectionID: string): Promise<Collection> => {
  try {
    const params = {
      TableName: collectionTable,
      Key: {
        collectionID: collectionID,
      },
    }

    const record = await dbbClient.get(params)
    return record.Item as Collection
  } catch (error: any) {
    logger.error(`Error fetching collection details: ${error}`)
    throw new CustomError(500, `Internal Server Error.`)
  }
}
