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
    const params = {
      TableName: tokenTable,
      IndexName: 'dealStatus-index',
      KeyConditionExpression: 'dealStatus = :d',
      ExpressionAttributeValues: {
        ':d': dealStatus,
      },
      ScanIndexForward: false,
      ProjectionExpression: 'id, cid, fileSize, userID',
    }

    const record = await dbbClient.query(params)
    return (record.Items as TokenList[]) ?? []
  } catch (error: any) {
    console.log(error)
    logger.error(`Error in listing collection: ${error}`)
    throw new CustomError(500, `Internal Server Error.`)
  }
}
