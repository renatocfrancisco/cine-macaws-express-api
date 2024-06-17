const express = require('express')
const router = express.Router()
const jwt = require('../../middlewares/jwt')
const {
    createSession,
    getSessions,
    getSession
} = require('../../controllers/session')

router.use(jwt)

router.post('/', createSession)
router.get('/', getSessions)
router.get('/:id', getSession)

module.exports = router
