const express = require('express')
const jwt = require('../../middlewares/jwt')
const {
    getPrices,
    createPrice,
    modifyPrice,
    deletePrice
} = require('../../controllers/price')

const router = express.Router()

router.use(jwt)

router.get('/', getPrices)
router.post('/', createPrice)
router.put('/:id', modifyPrice)
router.delete('/:id', deletePrice)

module.exports = router
