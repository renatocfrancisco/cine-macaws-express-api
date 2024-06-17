const { Schema, model } = require('mongoose')

const session = new Schema(
    {
        idMovie: { type: Schema.Types.ObjectId, ref: 'Movie' },
        type: String,
        room: Number,
        date: Date,
        startHour: Date,
        endHour: Date
    },
    { versionKey: false }
)

const Session = model('Session', session)

module.exports = Session
