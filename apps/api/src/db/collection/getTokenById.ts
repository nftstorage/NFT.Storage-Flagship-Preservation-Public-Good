import dbbClient from '../db/ddbClient.js'
import { tokenTable } from '../../config/constants.js'
import { Token } from '../../types/collection.js'
import logger from '../../utils/logger.js'
import CustomError from '../../middlewares/error/customError.js'

export default async (id: string): Promise<Token> => {
  try {
    const params = {
      TableName: tokenTable,
      Key: {
        id: id,
      },
    }

    const record = await dbbClient.get(params)
    return record.Item as Token
  } catch (error: any) {
    logger.error(`Error fetching token details: ${error}`)
    throw new CustomError(500, `Internal Server Error.`)
  }
}
