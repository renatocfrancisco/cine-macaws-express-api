const express = require('express')
const {
    createRating,
    getAverageRating,
    getRating
} = require('../../controllers/rating')
const jwt = require('../../middlewares/jwt')

const router = express.Router()

router.use(jwt)

router.post('/:idMovie/:rating', createRating)
router.get('/average/:idMovie', getAverageRating)
router.get('/:idMovie', getRating)

module.exports = router
