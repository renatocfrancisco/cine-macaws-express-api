const { Schema, model } = require('mongoose')

const movie = new Schema(
    {
        name: String,
        genre: String,
        rating: String,
        summary: String,
        poster: String,
        image: String
    },
    { versionKey: false }
)

const Movie = model('Movie', movie)

module.exports = Movie
