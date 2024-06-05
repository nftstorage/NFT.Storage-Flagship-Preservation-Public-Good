import { v4 } from 'uuid'
import cjs from 'crypto-js'

import recordAPIKey from '../../../db/user/apiKey/recordAPIKey.js'
import removeApiKey from '../../../db/user/apiKey/removeApiKey.js'
import getKeyRecordByID from '../../../db/user/apiKey/getKeyRecordByID.js'
import CustomError from '../../../middlewares/error/customError.js'
import increaseAPIKeyCount from '../../../db/user/increaseAPIKeyCount.js'
import decreaseAPIKeyCount from '../../../db/user/decreaseAPIKeyCount.js'

export const createApiKey = async (userID: string, keyName: string, role: string): Promise<string> => {
  const prefix = v4().split('-')[0]
  const apiKey = prefix + '.' + v4().split('-').join('')
  const record = {
    keyID: v4(),
    keyHash: cjs.SHA256(apiKey).toString(),
    keyName: keyName,
    userID: userID,
    userRole: role,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    lastUsed: Date.now(),
  }
  await recordAPIKey(record)
  await increaseAPIKeyCount(userID, 1)
  return apiKey
}

export const revokeApiKey = async (keyID: string, userID: string): Promise<string> => {
  const apiRecord = await getKeyRecordByID(keyID)
  if (apiRecord.userID !== userID) {
    throw new CustomError(403, 'Forbidden.')
  }
  await removeApiKey(keyID)
  await decreaseAPIKeyCount(userID, 1)
  return `Removed ${keyID}`
}
