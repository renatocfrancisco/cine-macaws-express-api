const express = require('express')
const { login, logout, refresh } = require('../../controllers/auth')
const limiter = require('../../middlewares/limiter')

const router = express.Router()

router.use(limiter)

router.post('/login', login)
router.get('/refresh', refresh)
router.post('/logout', logout)

module.exports = router
