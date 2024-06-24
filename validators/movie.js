const Joi = require('joi')
const { validGenres, validRatings } = require('./constant')
const { messages } = require('joi-translation-pt-br')

const movieSchema = Joi.object({
    name: Joi.string().required().label('Nome'),
    genre: Joi.string()
        .valid(...validGenres)
        .required()
        .label('Gênero'),
    rating: Joi.string()
        .valid(...validRatings)
        .required()
        .label('Classificação'),
    summary: Joi.string().required().label('Resumo'),
    poster: Joi.string().required().label('Poster'),
    image: Joi.string().required().label('Imagem')
}).messages(messages)

module.exports = movieSchema
