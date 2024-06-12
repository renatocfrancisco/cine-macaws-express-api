const express = require('express')
const {
    createMovie,
    getMovies,
    getMovie,
    modifyMovie,
    deleteMovie
} = require('../../controllers/movie')

const router = express.Router()

router.get('/', getMovies)
router.get('/:id', getMovie)
router.post('/', createMovie)
router.put('/:id', modifyMovie)
router.delete('/:id', deleteMovie)

module.exports = router
