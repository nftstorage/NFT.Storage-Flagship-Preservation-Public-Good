import {
  registerSchema,
  loginSchema,
  verificationTokenSchema,
  NewAPIKeySchema,
  APIKeyIDSchema,
  gitOAuth,
  PreservationCheckSchema,
} from './auth.js'
import { CreateCollectionSchema, collectionIdSchema, listTokenSchema, dealStatusSchema, tokenIDSchema } from './collection.js'
import { purchaseDataCap } from './payment.js'

export default {
  registerSchema,
  loginSchema,
  verificationTokenSchema,
  NewAPIKeySchema,
  APIKeyIDSchema,
  gitOAuth,
  PreservationCheckSchema,
  CreateCollectionSchema,
  collectionIdSchema,
  listTokenSchema,
  dealStatusSchema,
  purchaseDataCap,
  tokenIDSchema,
}
