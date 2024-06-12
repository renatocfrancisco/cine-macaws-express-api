const { Schema, model } = require('mongoose')

const rating = new Schema(
    {
        idUser: { type: Schema.Types.ObjectId, ref: 'User' },
        idMovie: { type: Schema.Types.ObjectId, ref: 'Movie' },
        rating: Boolean
    },
    { versionKey: false }
)

const Rating = model('Rating', rating)

module.exports = Rating
