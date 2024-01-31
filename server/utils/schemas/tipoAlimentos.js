const Joi = require('joi')

const documentIdSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/)

const createDocumentSchema = {
  tipo: Joi
    .string()
    .max(50)
    .required(),
  detalle: Joi
    .string()
    .max(255)
}

