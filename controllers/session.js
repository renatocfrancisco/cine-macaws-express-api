const sessionSchema = require('../validators/session')
const Session = require('../models/Session')
const { messages } = require('joi-translation-pt-br')

async function ifAlreadyCreatedSession(
    idMovie,
    type,
    date,
    startHour,
    endHour
) {
    const session = await Session.findOne({
        idMovie,
        type,
        date,
        startHour,
        endHour
    })

    return session ? true : false
}

async function createSession(req, res) {
    const result = sessionSchema.validate(req.body, { messages })
    if (result.error) {
        return res.status(400).send(result.error.message)
    }

    const { idMovie, type, date, startHour, endHour } = req.body
    if (
        await ifAlreadyCreatedSession(idMovie, type, date, startHour, endHour)
    ) {
        return res.status(400).send('Sessão ja foi criada para esse filme')
    }
    const newSession = new Session({
        idMovie,
        type,
        date,
        startHour,
        endHour
    })

    try {
        await newSession.save()
        return res.status(201).send(newSession)
    } catch (error) {
        return res.status(500).send(error)
    }
}

async function getSessions(req, res) {
    try {
        const nowShowing = req.params.nowShowing
        let filter = {}
        if (nowShowing === 'true') {
            const hourFilter = { date: { $gte: new Date() } }
            const movieIDS = await Session.aggregate([
                { $match: { ...hourFilter } },
                { $group: { _id: '$idMovie' } }
            ])
            filter._id = { $in: movieIDS }
        }

        const sessions = await Session.find(filter)
        return res.status(200).send(sessions)
    } catch (error) {
        return res.status(500).send(error)
    }
}

async function getSession(req, res) {
    if (!req.params.id) {
        return res.status(400).send('ID inválido')
    }

    try {
        const session = await Session.findById(req.params.id)
        if (session) {
            return res.status(200).send(session)
        } else {
            return res.status(404).send('Sessão não encontrada')
        }
    } catch (error) {
        return res.status(500).send(error)
    }
}

module.exports = { createSession, getSessions, getSession }
