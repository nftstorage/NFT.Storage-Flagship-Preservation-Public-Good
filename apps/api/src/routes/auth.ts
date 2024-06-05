import express from 'express'

import {
  create_api_key,
  list_api_keys,
  remove_api_key,
  github_oauth_handler,
  accept_terms,
} from '../controller/authentication/index.js'
import validator from '../middlewares/validators/index.js'
import validate from '../middlewares/validate.js'
import authenticator from '../middlewares/authenticator.js'

const router = express.Router()

// Github Authentication
router.get('/oauth/github', validate(validator.gitOAuth, { query: true }), github_oauth_handler)
router.get('/accept_terms', accept_terms)

// API Key
router.get('/create_api_key', validate(validator.NewAPIKeySchema, { query: true }), authenticator(), create_api_key)
router.get('/list_api_keys', authenticator(), list_api_keys)
router.delete('/remove_api_key', validate(validator.APIKeyIDSchema, { query: true }), authenticator(), remove_api_key)

export default router
