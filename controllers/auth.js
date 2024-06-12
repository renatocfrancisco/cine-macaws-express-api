const jwt = require('jsonwebtoken')
const { verify } = require('argon2')
const { messages } = require('joi-translation-pt-br')
const userSchema = require('../validators/user')
const User = require('../models/User')

function createAccessToken(id, username) {
    const payLoad = {
        id,
        username
    }
    return jwt.sign(payLoad, process.env.JWT_SECRET, {
        noTimestamp: true,
        expiresIn: '1h'
    })
}

function createRefreshToken(id, username) {
    const payLoad = {
        id,
        username
    }
    return jwt.sign(payLoad, process.env.JWT_REFRESH_SECRET, {
        noTimestamp: true,
        expiresIn: '1d'
    })
}

function findRefreshCookie(req) {
    const cookies = req.headers.cookie.split('; ')
    let jwt = null
    cookies.forEach(cookie => {
        if (cookie.startsWith('jwt=')) {
            jwt = cookie.split('jwt=')[1]
        }
    })
    return jwt
}

function findBearerToken(req) {
    const authHeader = req.headers.authorization || req.headers.Authorization
    const [bearer, token] = authHeader.split(' ')
    if (bearer === 'Bearer' && token) {
        return token
    }
}

async function login(req, res) {
    if (!process.env.JWT_SECRET || !process.env.JWT_REFRESH_SECRET) {
        return res.status(503).send('Login indisponível')
    }

    try {
        const result = userSchema.validate(req.body, { messages })
        if (result.error) {
            return res.status(400).send(result.error.message)
        }
        const { username, password } = req.body

        const userFound = await User.findOne({ username })
        const valid = await verify(userFound.password, password)

        if (!userFound || !valid) {
            return res.status(400).send('Usuário ou senha inválido')
        }

        const access = createAccessToken({ ...userFound, id: userFound._id })
        const refresh = createRefreshToken({ ...userFound, id: userFound._id })

        res.cookie('jwt', refresh, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        })
        res.status(200).send(access)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function logout(req, res) {
    const refresh = findRefreshCookie(req)
    const bearer = findBearerToken(req)

    if (!refresh || !bearer) {
        return res.sendStatus(204)
    }

    res.clearCookie('jwt', { httpOnly: true })
    res.sendStatus(204)
}

async function refresh(req, res) {
    const refreshCookie = findRefreshCookie(req)
    const bearer = findBearerToken(req)

    if (!refreshCookie || !bearer) {
        return res.sendStatus(204)
    }

    let payload = null
    jwt.verify(
        refreshCookie,
        process.env.JWT_REFRESH_SECRET,
        (err, decoded) => {
            if (err) {
                return res.sendStatus(401)
            }
            payload = decoded
        }
    )

    res.clearCookie('jwt', { httpOnly: true })
    const access = createAccessToken({ ...payload })
    const refresh = createRefreshToken({ ...payload })

    res.cookie('jwt', refresh, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
    res.status(200).send(access)
}

module.exports = {
    login,
    logout,
    refresh
}
