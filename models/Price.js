const { Schema, model } = require('mongoose')

const price = new Schema(
    {
        name: String,
        value: Number
    },
    { versionKey: false }
)

const Price = model('Price', price)

module.exports = Price
