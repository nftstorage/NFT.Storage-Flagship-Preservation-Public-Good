import joi from 'joi'

export const registerSchema = joi.object({
  email: joi.string().max(200).email().required().messages({
    'any.required': 'email not found.',
  }),
  marketingEmail: joi.boolean().default(true),
})

export const loginSchema = joi.object({
  email: joi.string().max(200).email().required().messages({
    'any.required': 'email not found.',
  }),
})

export const verificationTokenSchema = joi.object({
  verification_token: joi.string().length(64).required().messages({
    'any.required': 'verification token not found.',
  }),
})

export const NewAPIKeySchema = joi.object({
  keyName: joi.string().max(50).required().messages({
    'any.required': 'keyName not found.',
  }),
  role: joi.string().max(50).required().messages({
    'any.required': 'role not found.',
  }),
})

export const APIKeyIDSchema = joi.object({
  keyID: joi.string().max(50).required().messages({
    'any.required': 'keyID not found.',
  }),
})

export const gitOAuth = joi.object({
  code: joi.string().max(100).required().messages({
    'any.required': 'code not found.',
  }),
  emailOpt: joi.boolean(),
})
