const { Schema, model } = require('mongoose')

const user = new Schema(
    {
        username: String,
        password: String
    },
    { timestamps: true, versionKey: false }
)

const User = model('User', user)

module.exports = User
