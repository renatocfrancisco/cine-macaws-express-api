const { getExtraMovieInfo } = require('../axios/tmdb')
const Movie = require('../models/Movie')
const Session = require('../models/Session')
const movieSchema = require('../validators/movie')
const { messages } = require('joi-translation-pt-br')

async function createMovie(req, res) {
    const result = movieSchema.validate(req.body, { messages })
    if (result.error) {
        return res.status(400).send(result.error.message)
    }

    try {
        const { name, genre, rating } = req.body

        const movieAlreadyExists = await Movie.findOne({ name })
        if (movieAlreadyExists) {
            return res.status(400).send('Filme já existe')
        }

        const newMovie = new Movie({ name, genre, rating })

        const { summary, poster, image } = await getExtraMovieInfo(
            newMovie.name
        )
        if (summary && poster && image) {
            Object.assign(newMovie, { summary, poster, image })
        }
        await newMovie.save()
        return res.status(201).send(newMovie)
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

async function getMovies(req, res) {
    let { name, genre, rating, nowShowing } = req.query
    const filter = {
        ...(name && { name: new RegExp(name, 'i') }),
        ...(genre && { genre }),
        ...(rating && { rating })
    }

    if (nowShowing === 'true') {
        const hourFilter = { date: { $gte: new Date() } }
        const movieIDS = await Session.aggregate([
            { $match: { ...filter, ...hourFilter } },
            { $group: { _id: '$idMovie' } }
        ])
        filter._id = { $in: movieIDS }
    }

    try {
        const movies = await Movie.find(filter)
        if (!movies) {
            return res.status(404).send('Nenhum filme encontrado')
        }
        return res.status(200).send(movies)
    } catch (error) {
        return res.status(500).send(error)
    }
}

async function getMovie(req, res) {
    if (!req.params.id) {
        return res.status(400).send('ID inválido')
    }

    try {
        const movie = await Movie.findById(req.params.id)
        if (movie) {
            return res.status(200).send(movie)
        } else {
            return res.status(404).send('Filme não encontrado')
        }
    } catch (error) {
        return res.status(500).send(error)
    }
}

async function modifyMovie(req, res) {
    if (!req.params.id) {
        return res.status(400).send('ID inválido')
    }

    let oldMovie = await Movie.findById(req.params.id)
    if (!oldMovie) {
        return res.status(404).send('Filme não encontrado')
    }

    // eslint-disable-next-line no-unused-vars
    const { _id, ...oldValues } = oldMovie._doc
    const { name, genre, rating } = req.body
    const modify = {
        ...oldValues,
        ...(name && { name }),
        ...(genre && { genre }),
        ...(rating && { rating })
    }

    const result = movieSchema.validate(modify, { messages })
    if (result.error) {
        return res.status(400).send(result.error.message)
    }

    try {
        const movie = await Movie.findByIdAndUpdate(req.params.id, modify, {
            new: true
        })
        return res.status(200).send(movie)
    } catch (error) {
        return res.status(500).send(error)
    }
}

async function deleteMovie(req, res) {
    if (!req.params.id) {
        return res.status(400).send('ID inválido')
    }

    const movie = await Movie.findById(req.params.id)
    if (!movie) {
        return res.status(404).send('Filme não encontrado')
    }

    try {
        await Movie.findByIdAndDelete(req.params.id)
        return res.status(204).send()
    } catch (error) {
        return res.status(500).send(error)
    }
}

module.exports = { createMovie, getMovies, getMovie, modifyMovie, deleteMovie }
