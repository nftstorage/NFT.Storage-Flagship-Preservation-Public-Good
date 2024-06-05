import joi from 'joi'

export const purchaseDataCap = joi.object({
  dataCap: joi.number().required().messages({
    'any.required': 'dataCap not found.',
  }),
})
