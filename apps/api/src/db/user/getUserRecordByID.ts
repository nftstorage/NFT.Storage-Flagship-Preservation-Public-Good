import dbbClient from '../db/ddbClient.js'
import { usersTable } from '../../config/constants.js'
import logger from '../../utils/logger.js'
import CustomError from '../../middlewares/error/customError.js'
import { User } from '../../types/user.js'

export default async (userID: string): Promise<User> => {
  try {
    const params = {
      TableName: usersTable,
      Key: {
        userID: userID,
      },
    }

    const record = await dbbClient.get(params)
    return record.Item as User
  } catch (error: any) {
    logger.error(`Error get user record by ID: ${error}`)
    throw new CustomError(500, `Internal Server Error.`)
  }
}
