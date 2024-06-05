import { type NextFunction, type Request, type Response } from 'express'

export default (schema: any, intercept: any, allowUnknown = false) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const payload =
      intercept.query && intercept.body
        ? { ...req.query, ...req.body }
        : intercept.body
          ? { ...req.body }
          : { ...req.query }

    const defaultPayload = schema.validate(payload, { stripUnknown: true }).value
    req.body = defaultPayload
    const validated = schema.validate(payload, { allowUnknown })
    if (validated.error) {
      const error = {
        message: validated.error.details[0].message.replace(/"/g, ''),
        param: validated.error.details[0].context.key,
      }
      const errObj = {
        ok: false,
        error: error,
      }
      return res.status(400).json(errObj)
    }
    next()
  }
}
