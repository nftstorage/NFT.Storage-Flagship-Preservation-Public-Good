import cjs from 'crypto-js'

import config from '../config/index.js'
import { verifyJWT } from '../utils/verifyJWT.js'
import CustomError from './error/customError.js'
import getKeyRecord from '../db/user/apiKey/getKeyRecordByHash.js'
import updateLastUsed from '../db/user/apiKey/updateLastUsed.js'
import { JWTPayload } from '../types/user.js'
import { type NextFunction, type Request, type Response } from 'express'

const verifyAccessToken = async (accessToken: string) => {
  if (accessToken.split('.').length === 3) {
    const payload = verifyJWT(accessToken, config.jwt_secret) as JWTPayload
    if (payload.restricted) {
      throw new CustomError(403, 'Please accept the terms and condition.')
    }
    return payload
  } else {
    const keyRecord = await getKeyRecord(cjs.SHA256(accessToken).toString())
    updateLastUsed(keyRecord.keyID)
    return keyRecord
  }
}

export default (rules: string[] = [], clauses: string[] = []) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { authorization } = req.headers
      const accessToken = authorization?.split(' ')[1]

      if (!accessToken) {
        throw new CustomError(401, 'Unauthorized: Access token missing.')
      }

      const keyRecord = await verifyAccessToken(accessToken)
      if (!keyRecord) {
        throw new CustomError(401, 'Unauthorized: Invalid access token.')
      }

      req.body.user = keyRecord
      next()
    } catch (error) {
      next(error)
    }
  }
}
