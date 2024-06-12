const { verify } = require('jsonwebtoken')

async function jwt(req, res, next) {
    try {
        const authHeader =
            req.headers.Authorization || req.headers.authorization
        const [bearer, token] = authHeader.split(' ')
        if (bearer !== 'Bearer' || !token) {
            throw new Error()
        }

        req.user = verify(token, process.env.JWT_SECRET)
        next()
    } catch (error) {
        console.error(error)
        return res.status(401).send('Token inválido')
    }
}

module.exports = jwt
