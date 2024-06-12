const Joi = require('joi')

const userSchema = Joi.object().keys({
    username: Joi.string().required().label('Nome de usuário'),
    password: Joi.string().required().label('Senha')
})

module.exports = userSchema
