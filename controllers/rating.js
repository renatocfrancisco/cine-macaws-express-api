const Rating = require('../models/Rating')
const Movie = require('../models/Movie')

async function createRating(req, res) {
    const idUser = req.user.id.id
    let { idMovie, rating } = req.params

    const movie = await Movie.findById(idMovie)
    if (!movie) {
        return res.status(404).send('Filme não encontrado')
    }

    const userAlreadyRated = await Rating.findOne({
        idUser,
        idMovie: movie.id
    })

    rating = rating === 'true' ? true : false

    if (userAlreadyRated) {
        userAlreadyRated.rating = rating
        await userAlreadyRated.save()
        return res.status(200).send(userAlreadyRated)
    }

    const newRating = new Rating({ idUser, idMovie: movie.id, rating })
    try {
        await newRating.save()
        return res.status(201).send(newRating)
    } catch (error) {
        return res.status(500).send(error)
    }
}

async function getRating(req, res) {
    let { idMovie } = req.params
    if (!idMovie) {
        return res.status(400).send('ID inválido')
    }

    try {
        const rating = await Rating.findOne({ idMovie, idUser: req.user.id.id })
        if (!rating) {
            return res.status(404).send('Nenhuma avaliação encontrada')
        }
        return res.status(200).send(rating.rating)
    } catch (error) {
        return res.status(500).send(error)
    }
}

async function getAverageRating(req, res) {
    let { idMovie } = req.params
    if (!idMovie) {
        return res.status(400).send('ID inválido')
    }

    const totalRatings = await Rating.countDocuments({ idMovie })
    const totalRatingsTrue = await Rating.countDocuments({
        idMovie,
        rating: true
    })

    if (totalRatings === 0) {
        return res.status(404).send('Nenhuma avaliação encontrada')
    }

    function averageString(totalRatingsTrue, total) {
        return String((totalRatingsTrue / total) * 100).slice(0, 5) + '%'
    }

    try {
        const averageRating = averageString(totalRatingsTrue, totalRatings)
        return res.status(200).send(averageRating)
    } catch (error) {
        return res.status(500).send(error)
    }
}

module.exports = { createRating, getAverageRating, getRating }
