const Joi = require('joi')

const documentIdSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/)
const documentTagSchema = Joi.array().items(Joi.string().max(10))

const createDocumentSchema = {
  name: Joi
    .string()
    .max(50)
    .required(),
  price: Joi
    .number()
    .min(1)
    .max(1000000),
  image: Joi
    .string()
    .required(),
  tags: documentTagSchema
}

const updateDocumentSchema = {
  name: Joi
    .string()
    .max(50),
  price: Joi
    .number()
    .min(1)
    .max(1000000),
  image: Joi
    .string(),
  tags: documentTagSchema
}

module.exports = {
  documentIdSchema,
  documentTagSchema,
  createDocumentSchema,
  updateDocumentSchema
}
