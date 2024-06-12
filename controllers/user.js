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

module.exports = { createUser }
