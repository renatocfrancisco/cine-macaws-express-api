const express = require('express')

const auth = require('./auth')
const user = require('./user')
const movie = require('./movie')
const rating = require('./rating')
const session = require('./session')
const price = require('./price')
const constant = require('./constant')

const router = express.Router()

router.get('/', (_req, res) => {
    res.send('Cine Macaws API')
})

router.use('/auth', auth)
router.use('/user', user)
router.use('/movie', movie)
router.use('/rating', rating)
router.use('/session', session)
router.use('/price', price)
router.use('/constant', constant)

module.exports = router
