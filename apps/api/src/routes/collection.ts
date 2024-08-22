import express from 'express'

import {
  create_collection,
  list_collections,
  collection_info,
  add_tokens,
  list_tokens,
  deal_status,
} from '../controller/collection/index.js'
import validator from '../middlewares/validators/index.js'
import validate from '../middlewares/validate.js'
import authenticator from '../middlewares/authenticator.js'
import uploadFile from '../middlewares/upload.js'

const router = express.Router()

router.post(
  '/create_collection',
  validate(validator.CreateCollectionSchema, { body: true }),
  authenticator(),
  create_collection,
)
router.get('/list_collections', authenticator(), list_collections)
router.get(
  '/collection_info',
  validate(validator.collectionIdSchema, { query: true }),
  authenticator(),
  collection_info,
)

router.post('/add_tokens', uploadFile.single('file'), authenticator(), add_tokens)
router.get('/list_tokens', validate(validator.listTokenSchema, { query: true }), authenticator(), list_tokens)
router.get('/deal_status', validate(validator.dealStatusSchema, { query: true }), deal_status)

export default router
