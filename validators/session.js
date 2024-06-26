const Joi = require('joi')
const { messages } = require('joi-translation-pt-br')
const { validSessionTypes } = require('./constant')

const sessionSchema = Joi.object()
    .keys({
        idMovie: Joi.string().required().label('Id da Sessão'),
        type: Joi.string()
            .required()
            .label('Tipo')
            .valid(...validSessionTypes),
        room: Joi.number().required().label('Sala').min(1).max(10),
        date: Joi.date().required().label('Data'),
        startHour: Joi.date().required().label('Hora de Início'),
        endHour: Joi.date().required().label('Hora de Fim')
    })
    .messages(messages)

module.exports = sessionSchema
