const Joi = require('joi')

const validGenres = [
    'Ação',
    'Aventura',
    'Animação',
    'Comédia',
    'Drama',
    'Fantasia',
    'Terror',
    'Romance',
    'Suspense',
    'Faroeste',
    'Musical',
    'Documentário',
    'Sci-fi',
    'Histórico'
]
const validRatings = ['L', '10', '12', '14', '16', '18']

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
