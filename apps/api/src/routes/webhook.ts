import express from 'express'
import { webhook_stripe } from '../controller/payment/index.js'

const router = express.Router()

router.post('/stripe', express.raw({ type: 'application/json' }), webhook_stripe)

export default router
