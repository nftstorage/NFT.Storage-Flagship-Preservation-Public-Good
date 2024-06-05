import dbbClient from '../db/ddbClient.js'
import { Transaction } from '../../types/transaction.js'
import { transactionTable } from '../../config/constants.js'
import logger from '../../utils/logger.js'
import CustomError from '../../middlewares/error/customError.js'

export default async (txDetails: Transaction): Promise<void> => {
  try {
    const params = {
      TableName: transactionTable,
      Item: txDetails,
    }

    await dbbClient.put(params)
  } catch (error: any) {
    logger.error(`Error in recording transaction: ${error}`)
    throw new CustomError(500, `Internal Server Error.`)
  }
}
