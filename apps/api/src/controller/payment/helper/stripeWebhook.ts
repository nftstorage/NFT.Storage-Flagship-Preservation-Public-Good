import Stripe from 'stripe'
import { type Request } from 'express'

import config from '../../../config/index.js'
import updateUserDataLimit from '../../../db/user/updateUserDataLimit.js'
import recordTransaction from '../../../db/transactions/recordTransaction.js'
import CustomError from '../../../middlewares/error/customError.js'

const stripe = new Stripe(config.stripe_key)

export const validateStripPayload = async (req: Request) => {
  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      req.headers['stripe-signature'] as any,
      config.stripe_webhook,
      undefined,
    )
    return { data: event.data.object, eventType: event.type }
  } catch (err: any) {
    throw new CustomError(401, err)
  }
}

export const processStripePayment = async (data: any, eventType: any) => {
  switch (eventType) {
    case 'checkout.session.completed':
      const invoiceMetadata = data.invoice_creation.invoice_data.metadata
      const dataCapPurchased = parseInt(`${invoiceMetadata.dataCap ?? 0}`, 10) * 1073741824 // GB converted to bytes
      if (dataCapPurchased) {
        await updateUserDataLimit(invoiceMetadata.userId, dataCapPurchased)
      }

      const txRecord = {
        txID: data.id,
        userID: invoiceMetadata.userId,
        gateway: 'Stripe',
        amount: data.amount_subtotal,
        receiptNo: data.invoice,
        status: data.status,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }
      await recordTransaction(txRecord)
  }

  return 'success'
}
