import { type NextFunction, type Request, type Response } from 'express'

import responseParser from '../../utils/responseParser.js'
import { create_session_order } from './helper/stripe.js'
import { validateStripPayload, processStripePayment } from './helper/stripeWebhook.js'
import getUserTransactions from '../../db/transactions/getUserTransactions.js'
import getUserRecordByID from '../../db/user/getUserRecordByID.js'

export const list_all_transaction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const record = await getUserTransactions(req.body.user.userID)
    const response = responseParser(record)
    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
}

export const initiate_stripe_transaction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userDetails = await getUserRecordByID(req.body.user.userID)
    const data = await create_session_order(
      parseInt(req.query.dataCap as string),
      userDetails.userID,
      userDetails.githubAdd,
    )
    const response = responseParser(data)
    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
}

export const webhook_stripe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { data: stripeData, eventType } = await validateStripPayload(req)
    await processStripePayment(stripeData, eventType)
    const response = responseParser('Success.')
    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
}
