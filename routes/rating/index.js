const express = require('express')
const { createRating, getAverageRating } = require('../../controllers/rating')
const jwt = require('../../middlewares/jwt')

const router = express.Router()

router.use(jwt)
router.post('/:idMovie/:rating', createRating)
router.get('/average/:idMovie', getAverageRating)

module.exports = router
