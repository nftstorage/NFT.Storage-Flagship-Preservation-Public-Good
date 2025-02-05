import dbbClient from '../db/ddbClient.js'
import { tokenTable } from '../../config/constants.js'
import logger from '../../utils/logger.js'
import CustomError from '../../middlewares/error/customError.js'

type TokenList = {
  id: string
  cid: string
  fileSize: number
  userID: string
}

export default async (dealStatus: string): Promise<TokenList[]> => {
  try {
    let exclusiveStartKey
    const elements = []
    do {
      const params = {
        TableName: tokenTable,
        IndexName: 'dealStatus-index',
        KeyConditionExpression: 'dealStatus = :d',
        ExpressionAttributeValues: {
          ':d': dealStatus,
        },
        ScanIndexForward: false,
        ProjectionExpression: 'id, cid, fileSize, userID',
        ExclusiveStartKey: exclusiveStartKey
      }
      const record: any = await dbbClient.query(params)
      elements.push(...(record.Items ?? []))
      exclusiveStartKey = record.LastEvaluatedKey
      console.log(exclusiveStartKey)
    } while (exclusiveStartKey)
    return elements as TokenList[]
  } catch (error: any) {
    logger.error(`Error in listing collection: ${error}`)
    throw new CustomError(500, `Internal Server Error.`)
  }
}
