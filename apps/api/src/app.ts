import express, { Request, Response } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import expressWinston from 'express-winston'
import cron from 'node-cron'

import AuthRouter from './routes/auth.js'
import UserRouter from './routes/user.js'
import CollectionRouter from './routes/collection.js'
import PaymentRouter from './routes/payments.js'
import WebhookRouter from './routes/webhook.js'
import errorHandler from './middlewares/error/index.js'
import logger from './utils/logger.js'
import config from './config/index.js'
import { refreshFileStatus } from './controller/collection/helper/index.js'
import { refreshDealStatus } from './controller/collection/helper/index.js'

const app = express()
app.use(morgan('dev'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use('/api/v1/webhook', WebhookRouter)
app.use(bodyParser.json())

app.use((req, res, next) => {
  logger.info(req.originalUrl)
  next()
})
app.use(
  expressWinston.errorLogger({
    winstonInstance: logger,
  }),
)

app.use(cors())

app.get('/health', (req: Request, res: Response) => {
  res.status(200).send('OK')
})

app.use('/api/v1/auth', AuthRouter)
app.use('/api/v1/user', UserRouter)
app.use('/api/v1/collection', CollectionRouter)
app.use('/api/v1/payment', PaymentRouter)

app.use(errorHandler)

if (config.environment === 'production') {
  const tokenStatusCRON = cron.schedule('0 */4 * * *', () => {
    console.log('Running token file status')
    refreshFileStatus()
  })
  const tokenDealCRON = cron.schedule('0 */6 * * *', () => {
    console.log('Running token deal status')
    refreshDealStatus()
  })
}

export default app
