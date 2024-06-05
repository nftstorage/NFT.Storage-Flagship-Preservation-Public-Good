import dbbClient from '../../db/ddbClient.js'
import { authTable } from '../../../config/constants.js'
import { APIKey } from '../../../types/user.js'
import logger from '../../../utils/logger.js'
import CustomError from '../../../middlewares/error/customError.js'

export default async (keyID: string): Promise<APIKey> => {
  try {
    const params = {
      TableName: authTable,
      Key: {
        keyID: keyID,
      },
    }

    const record = await dbbClient.get(params)
    return record.Item as APIKey
  } catch (error: any) {
    logger.error(`Error fetch key record by id: ${error}`)
    throw new CustomError(500, `Internal Server Error.`)
  }
}
