const express = require('express')
const limiter = require('../../middlewares/limiter')
const {
    validGenres,
    validRatings,
    validSessionTypes
} = require('../../validators/constant')

const router = express.Router()

router.use(limiter)

router.get('/genres', (_req, res) => {
    res.send(validGenres)
})

router.get('/ratings', (_req, res) => {
    res.send(validRatings)
})

router.get('/session-types', (_req, res) => {
    res.send(validSessionTypes)
})

module.exports = router
