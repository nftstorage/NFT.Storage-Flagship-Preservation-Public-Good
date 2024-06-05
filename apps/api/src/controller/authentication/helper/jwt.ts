import jwt from 'jsonwebtoken'

import { AccessToken } from '../../../types/accessToken.js'
import config from '../../../config/index.js'
import { jwtAlgo, jwtExpire } from '../../../config/constants.js'

export const getAccessToken = (userID: string, restricted: boolean): AccessToken => {
  const payLoad = { userID, restricted }
  const accessToken = jwt.sign(payLoad, config.jwt_secret, {
    algorithm: jwtAlgo,
    expiresIn: jwtExpire,
  })
  return { accessToken }
}
