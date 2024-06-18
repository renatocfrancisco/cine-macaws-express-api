const Joi = require('joi')

const priceSchema = Joi.object({
    name: Joi.string().required().label('Nome'),
    price: Joi.number().required().label('Preço')
})

module.exports = priceSchema
