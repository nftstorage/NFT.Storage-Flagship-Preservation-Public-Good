import dbbClient from '../db/ddbClient.js'
import { usersTable } from '../../config/constants.js'
import logger from '../../utils/logger.js'
import { User } from '../../types/user.js'
import CustomError from '../../middlewares/error/customError.js'

export default async (gitHubAdd: string): Promise<User | undefined> => {
  try {
    const params = {
      TableName: usersTable,
      IndexName: 'githubAdd-index',
      KeyConditionExpression: 'githubAdd = :g',
      ExpressionAttributeValues: {
        ':g': gitHubAdd,
      },
    }

    const record = await dbbClient.query(params)
    const Items = record.Items ?? []
    return Items[0] as User
  } catch (error: any) {
    logger.error(`Error fetch user record with githubAdd index: ${error}`)
    throw new CustomError(500, `Internal Server Error.`)
  }
}
