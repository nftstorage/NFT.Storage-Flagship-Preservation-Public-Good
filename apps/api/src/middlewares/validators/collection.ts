import joi from 'joi'

export const CreateCollectionSchema = joi.object({
  collectionName: joi.string().max(100).default(''),
  contractAddress: joi.string().max(100).default(''),
  chainID: joi.string().max(30).default(''),
  network: joi.string().max(30).default(''),
})

export const collectionIdSchema = joi.object({
  collectionID: joi.string().max(100).required().messages({
    'any.required': 'collectionID not found.',
  }),
})

export const listTokenSchema = joi.object({
  collectionID: joi.string().max(100).required().messages({
    'any.required': 'collectionID not found.',
  }),
  lastKey: joi.string().max(100).default(null),
})
