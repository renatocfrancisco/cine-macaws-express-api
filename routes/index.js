const express = require('express')

const auth = require('./auth')
const user = require('./user')
const movie = require('./movie')
const rating = require('./rating')

const router = express.Router()

router.get('/', (_req, res) => {
    res.send('Cine Macaws API')
})

router.use('/auth', auth)
router.use('/user', user)
router.use('/movie', movie)
router.use('/rating', rating)

module.exports = router
