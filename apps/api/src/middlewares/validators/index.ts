import {
  registerSchema,
  loginSchema,
  verificationTokenSchema,
  NewAPIKeySchema,
  APIKeyIDSchema,
  gitOAuth,
} from './auth.js'
import { CreateCollectionSchema, collectionIdSchema, listTokenSchema } from './collection.js'
import { purchaseDataCap } from './payment.js'

export default {
  registerSchema,
  loginSchema,
  verificationTokenSchema,
  NewAPIKeySchema,
  APIKeyIDSchema,
  gitOAuth,
  CreateCollectionSchema,
  collectionIdSchema,
  listTokenSchema,
  purchaseDataCap,
}
