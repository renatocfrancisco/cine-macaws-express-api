const Joi = require('joi')
const { messages } = require('joi-translation-pt-br')

const userSchema = Joi.object()
    .keys({
        username: Joi.string().required().label('Nome de usuário'),
        password: Joi.string().required().label('Senha')
    })
    .messages(messages)

module.exports = userSchema
