import { type NextFunction, type Response, type Request } from 'express'
import getBalance from '../../db/user/getBalance.js'
import responseParser from '../../utils/responseParser.js'

export const get_balance = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await getBalance(req.body.user.userID)
    const response = responseParser(data)
    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
}
