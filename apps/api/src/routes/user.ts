import express from 'express'

import { get_balance } from '../controller/user/index.js'
import authenticator from '../middlewares/authenticator.js'

const router = express.Router()

router.get('/get_balance', authenticator(), get_balance)

export default router
