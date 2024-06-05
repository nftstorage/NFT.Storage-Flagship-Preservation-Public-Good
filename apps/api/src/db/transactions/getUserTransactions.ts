import dbbClient from '../db/ddbClient.js'
import { transactionTable } from '../../config/constants.js'
import logger from '../../utils/logger.js'
import CustomError from '../../middlewares/error/customError.js'

export default async (userID: string) => {
  try {
    const params = {
      TableName: transactionTable,
      IndexName: 'userID-index',
      KeyConditionExpression: 'userID = :u',
      ExpressionAttributeValues: {
        ':u': userID,
      },
    }

    const record = await dbbClient.query(params)
    return record.Items ?? []
  } catch (error: any) {
    logger.error(`Error fetch user transactions: : ${error}`)
    throw new CustomError(500, `Internal Server Error.`)
  }
}
