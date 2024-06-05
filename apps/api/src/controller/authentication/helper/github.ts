import qs from 'qs'
import { v4 } from 'uuid'

import config from '../../../config/index.js'
import { getAccessToken } from './jwt.js'
import createUserRecord from '../../../db/user/createUserRecord.js'
import CustomError from '../../../middlewares/error/customError.js'
import getUserRecordByGitAdd from '../../../db/user/getUserRecordByGitAdd.js'
import { AccessToken } from '../../../types/accessToken.js'
import acceptTermsAndCondition from '../../../db/user/acceptTermsAndCondition.js'
import { verifyJWT } from '../../../utils/verifyJWT.js'
import getUserRecordByID from '../../../db/user/getUserRecordByID.js'
import { JWTPayload } from '../../../types/user.js'
import acceptMarketingMail from '../../../db/user/acceptMarketingMail.js'

const getGithubOathToken = async (code: string) => {
  const rootUrl = 'https://github.com/login/oauth/access_token'
  const options = {
    client_id: config.github_client_id,
    client_secret: config.github_client_secret,
    code,
  }

  const queryString = qs.stringify(options)

  try {
    const response = await fetch(`${rootUrl}?${queryString}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`)
    }

    const data = await response.text()
    const decoded = qs.parse(data)

    return decoded
  } catch (err) {
    throw new CustomError(400, 'Access token expired or invalid.')
  }
}

export const getGithubUser = async (access_token: string) => {
  try {
    const response = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`)
    }

    const data = await response.json()

    return data
  } catch (err) {
    throw new CustomError(400, 'Failed to get user details.')
  }
}

export const handleGitHubAuth = async (
  code: string,
  emailOpt: boolean,
): Promise<{ accessToken: AccessToken; restristed: boolean }> => {
  const { access_token } = await getGithubOathToken(code)
  const { login, email } = await getGithubUser(access_token as string)

  const userRecord = await getUserRecordByGitAdd(login)

  if (!userRecord) {
    const record = {
      userID: v4(),
      emailAdd: email ? email : 'null-' + v4(),
      githubAdd: login,
      dataLimit: 0,
      dataUsed: 0,
      collectionCount: 0,
      tokenCount: 0,
      APIKeyCount: 0,
      marketingEmail: emailOpt,
      accountRestricted: false,
      termsAndCondition: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    await createUserRecord(record)
    return { accessToken: getAccessToken(record.userID, true), restristed: true }
  } else {
    if (userRecord.termsAndCondition) {
      return { accessToken: getAccessToken(userRecord.userID, false), restristed: false }
    }
    return { accessToken: getAccessToken(userRecord.userID, true), restristed: true }
  }
}

export const handleAcceptTerms = async (accessToken: string, marketingEmail: boolean): Promise<AccessToken> => {
  const payload = verifyJWT(accessToken, config.jwt_secret) as JWTPayload
  const userRecord = await getUserRecordByID(payload.userID)

  if (!userRecord) {
    throw new CustomError(404, 'User not found.')
  } else {
    await acceptTermsAndCondition(userRecord.userID)
    if (marketingEmail) {
      acceptMarketingMail(userRecord.userID)
    }
    return getAccessToken(userRecord.userID, false)
  }
}
