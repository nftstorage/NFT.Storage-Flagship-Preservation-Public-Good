import { type NextFunction, type Response, type Request } from 'express'

import { createApiKey, revokeApiKey } from './helper/apiKey.js'
import { handleGitHubAuth, handleAcceptTerms } from './helper/github.js'
import getAllKeys from '../../db/user/apiKey/getAllKeys.js'
import responseParser from '../../utils/responseParser.js'

export const create_api_key = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const apiKey = await createApiKey(req.body.user.userID, req.query.keyName as string, req.query.role as string)
    const data = responseParser({ apiKey })
    res.status(200).json(data)
  } catch (error) {
    next(error)
  }
}

export const list_api_keys = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await getAllKeys(req.body.user.userID)
    const response = responseParser(data)
    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
}

export const remove_api_key = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await revokeApiKey(req.query.keyID as string, req.body.user.userID)
    const data = responseParser('API key removed.')
    res.status(200).send(data)
  } catch (error) {
    next(error)
  }
}

export const github_oauth_handler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const emailOpt = req.query.emailOpt?.toString() === 'true' ? true : false
    const token = await handleGitHubAuth(req.query.code as string, emailOpt)
    const data = responseParser({
      message: token.restristed ? 'Please accept terms and conditions.' : 'Login successful.',
      accessToken: token.accessToken.accessToken,
    })
    res.status(200).json(data)
  } catch (error) {
    next(error)
  }
}

export const accept_terms = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers
    const accessToken = authorization?.split(' ')[1]
    const token = await handleAcceptTerms(accessToken as string, Boolean(req.query.marketingEmail))
    const data = responseParser({
      message: 'Login successful.',
      accessToken: token.accessToken,
    })
    res.status(200).json(data)
  } catch (error) {
    next(error)
  }
}
