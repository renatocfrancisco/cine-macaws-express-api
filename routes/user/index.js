const express = require('express')
const { createUser } = require('../../controllers/user')
const router = express.Router()
const limiter = require('../../middlewares/limiter')
const jwt = require('../../middlewares/jwt')

router.use(jwt)

// router.get('/', getUser)
// router.get('/:id', getOneUser)
// router.put('/:id', updateUser)
// router.delete('/:id', deleteUser)
router.post('/', limiter, createUser)

module.exports = router
