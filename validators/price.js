const Joi = require('joi')
const { messages } = require('joi-translation-pt-br')

const priceSchema = Joi.object({
    name: Joi.string().required().label('Nome'),
    price: Joi.number().required().label('Preço')
}).messages(messages)

module.exports = priceSchema
