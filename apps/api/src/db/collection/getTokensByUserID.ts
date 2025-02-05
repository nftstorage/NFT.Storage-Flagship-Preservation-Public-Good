import dbbClient from '../db/ddbClient.js'
import { tokenTable } from '../../config/constants.js'
import logger from '../../utils/logger.js'
import CustomError from '../../middlewares/error/customError.js'
import { Token } from '../../types/collection.js'

export default async (userID: string): Promise<Token[]> => {
  try {
    let exclusiveStartKey
    const elements = []
    do {
      const params = {
        TableName: tokenTable,
        IndexName: 'userID-index',
        KeyConditionExpression: 'userID = :userID',
        ExpressionAttributeValues: {
          ':userID': userID,
        }
      }
      const record = await dbbClient.query(params)
      elements.push(...(record.Items ?? []))
      exclusiveStartKey = record.LastEvaluatedKey
    } while (exclusiveStartKey)
      return elements as Token[]
  } catch (error: any) {
    logger.error(`Error fetching tokens by userID: ${error}`)
    throw new CustomError(500, `Internal Server Error.`)
  }
}
