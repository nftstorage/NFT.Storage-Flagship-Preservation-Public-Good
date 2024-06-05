import dbbClient from '../db/ddbClient.js'
import { usersTable } from '../../config/constants.js'
import logger from '../../utils/logger.js'
import CustomError from '../../middlewares/error/customError.js'

type Balance = {
  dataLimit: number
  dataUsed: number
}

export default async (userID: string): Promise<Balance> => {
  try {
    const params = {
      TableName: usersTable,
      Key: {
        userID: userID,
      },
      ProjectionExpression: 'dataLimit, dataUsed',
    }

    const record = await dbbClient.get(params)
    return record.Item as Balance
  } catch (error: any) {
    logger.error(`Error get user balance: ${error}`)
    throw new CustomError(500, `Internal Server Error.`)
  }
}
