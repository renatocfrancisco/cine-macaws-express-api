const express = require('express')
const { createUser } = require('../../controllers/user')
const router = express.Router()
const limiter = require('../../middlewares/limiter')

// router.use(auth)

// router.get('/', getUser)
// router.get('/:id', getOneUser)
// router.put('/:id', updateUser)
// router.delete('/:id', deleteUser)
router.post('/', limiter, createUser)

module.exports = router
