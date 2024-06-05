import express from 'express'

import { list_all_transaction, initiate_stripe_transaction } from '../controller/payment/index.js'
import validator from '../middlewares/validators/index.js'
import validate from '../middlewares/validate.js'
import authenticator from '../middlewares/authenticator.js'

const router = express.Router()

router.get('/list_all_transaction', authenticator(), list_all_transaction)

router.get(
  '/initiate_stripe_transaction',
  validate(validator.purchaseDataCap, { query: true }),
  authenticator(),
  initiate_stripe_transaction,
)

export default router
