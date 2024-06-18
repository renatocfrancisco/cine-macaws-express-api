async function isAuthAvailable(_req, res, next) {
    if (!process.env.JWT_SECRET || !process.env.JWT_REFRESH_SECRET) {
        return res.status(503).send('Serviços de autenticação indisponíveis')
    }
    next()
}

module.exports = isAuthAvailable
