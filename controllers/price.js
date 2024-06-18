const priceSchema = require('../validators/price')
const Price = require('../models/Price')
const { messages } = require('joi-translation-pt-br')

async function getPrices(_req, res) {
    try {
        const prices = await Price.find()
        if (prices.length === 0) {
            return res.status(404).send('Nenhum preço encontrado')
        }
        return res.status(200).send(prices)
    } catch (error) {
        return res.status(500).send(error)
    }
}

async function createPrice(req, res) {
    const result = priceSchema.validate(req.body, { messages })
    if (result.error) {
        return res.status(400).send(result.error.message)
    }

    try {
        const { name, value } = req.body

        const priceAlreadyExists = await Price.findOne({ name })
        if (priceAlreadyExists) {
            return res.status(400).send('Preço já existe')
        }

        const newPrice = new Price({ name, value })

        await newPrice.save()
        return res.status(201).send(newPrice)
    } catch (error) {
        return res.status(500).send(error)
    }
}

async function modifyPrice(req, res) {
    if (!req.params.id) {
        return res.status(400).send('ID inválido')
    }

    let oldPrice = await Price.findById(req.params.id)
    if (!oldPrice) {
        return res.status(404).send('Preço não encontrado')
    }

    // eslint-disable-next-line no-unused-vars
    const { _id, ...oldValues } = oldPrice._doc
    const { name, value } = req.body
    const modify = {
        ...oldValues,
        ...(name && { name }),
        ...(value && { value })
    }

    const result = priceSchema.validate(modify, { messages })
    if (result.error) {
        return res.status(400).send(result.error.message)
    }

    try {
        const price = await Price.findByIdAndUpdate(req.params.id, modify, {
            new: true
        })
        return res.status(200).send(price)
    } catch (error) {
        return res.status(500).send(error)
    }
}

async function deletePrice(req, res) {
    if (!req.params.id) {
        return res.status(400).send('ID inválido')
    }

    const price = await Price.findById(req.params.id)
    if (!price) {
        return res.status(404).send('Preço não encontrado')
    }

    try {
        await Price.findByIdAndDelete(req.params.id)
        return res.status(200).send('Preço excluído')
    } catch (error) {
        return res.status(500).send(error)
    }
}

module.exports = {
    getPrices,
    createPrice,
    modifyPrice,
    deletePrice
}
