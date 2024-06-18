const { hash } = require('argon2')
const userSchema = require('../validators/user')
const User = require('../models/User')
const { messages } = require('joi-translation-pt-br')

async function createUser(req, res) {
    try {
        const result = userSchema.validate(req.body, { messages })
        if (result.error) {
            return res.status(400).send(result.error.message)
        }
        const { username, password } = req.body
        const userFound = await User.findOne({ username })

        if (userFound) {
            return res.status(400).send('Usuário ja existe')
        }
        const hashedPassword = await hash(password)

        const newUser = new User({ username, password: hashedPassword })
        await newUser.save()

        return res.status(201).send(newUser)
    } catch (error) {
        return res.status(500).send(error)
    }
}

async function modifyUser(req, res) {
    if (!req.params.id) {
        return res.status(400).send('ID inválido')
    }

    let oldUser = await User.findById(req.params.id)
    if (!oldUser) {
        return res.status(404).send('Usuário não encontrado')
    }

    // eslint-disable-next-line no-unused-vars
    const { _id, ...oldValues } = oldUser._doc
    const { username, password } = req.body
    const modify = {
        ...oldValues,
        ...(username && { username }),
        ...(password && { password })
    }

    const result = userSchema.validate(modify, { messages })

    if (result.error) {
        return res.status(400).send(result.error.message)
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id, modify, {
            new: true
        })
        return res.status(200).send(user)
    } catch (error) {
        return res.status(500).send(error)
    }
}

module.exports = { createUser, modifyUser }
