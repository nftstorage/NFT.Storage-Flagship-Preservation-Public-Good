import { type NextFunction, type Request, type Response } from 'express'
import CustomError from './customError.js'

export default (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    const errorCode = err?.error?.code
    const errObj = {
      ok: false,
      error: err.error,
    }
    return res.status(errorCode).json(errObj)
  }
  return res.status(400).json({
    ok: false,
    error: [{ message: 'Something went wrong.' }],
  })
}
