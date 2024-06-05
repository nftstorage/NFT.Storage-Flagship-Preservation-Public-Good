import dbbClient from '../db/ddbClient.js'
import { User } from '../../types/user.js'
import { usersTable } from '../../config/constants.js'
import logger from '../../utils/logger.js'
import CustomError from '../../middlewares/error/customError.js'

export default async (userDetails: User): Promise<void> => {
  try {
    const params = {
      TableName: usersTable,
      Item: userDetails,
    }

    await dbbClient.put(params)
  } catch (error: any) {
    logger.error(`Error in create user record: ${error}`)
    throw new CustomError(500, `Internal Server Error.`)
  }
}
