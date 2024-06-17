const express = require('express')
const {
    createMovie,
    getMovies,
    getMovie,
    modifyMovie,
    deleteMovie,
    getHighlightedMovies
} = require('../../controllers/movie')
const jwt = require('../../middlewares/jwt')

const router = express.Router()

router.use(jwt)

router.get('/', getMovies)
router.post('/', createMovie)
router.get('/highlight', getHighlightedMovies)
router.get('/:id', getMovie)
router.put('/:id', modifyMovie)
router.delete('/:id', deleteMovie)

module.exports = router
