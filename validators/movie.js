const Joi = require('joi')
const { validGenres, validRatings } = require('./constant')

const movieSchema = Joi.object({
    name: Joi.string().required().label('Nome'),
    genre: Joi.string()
        .valid(...validGenres)
        .required()
        .label('Gênero'),
    rating: Joi.string()
        .valid(...validRatings)
        .required()
        .label('Classificação')
})

module.exports = movieSchema
