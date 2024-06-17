const express = require('express')
const {
    createMovie,
    getMovies,
    getMovie,
    modifyMovie,
    deleteMovie
} = require('../../controllers/movie')
const jwt = require('../../middlewares/jwt')

const router = express.Router()

router.use(jwt)

router.get('/', getMovies)
router.get('/:id', getMovie)
router.post('/', createMovie)
router.put('/:id', modifyMovie)
router.delete('/:id', deleteMovie)

module.exports = router
