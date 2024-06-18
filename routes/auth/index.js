const express = require('express')
const { login, logout, refresh } = require('../../controllers/auth')
const limiter = require('../../middlewares/limiter')
const isAuthAvailable = require('../../middlewares/isAuthAvailable')

const router = express.Router()

router.use(limiter, isAuthAvailable)

router.post('/login', login)
router.get('/refresh', refresh)
router.post('/logout', logout)

module.exports = router
