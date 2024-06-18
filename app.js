/* eslint-disable no-unused-vars */
const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const morgan = require('morgan')
const compression = require('compression')

const routes = require('./routes')
const db = require('./db/mongoose')

const port = process.env.PORT || 3000
const host = process.env.HOST || 'localhost'

const app = express()

app.disable('x-powered-by')
app.use(helmet(), cors(), express.json(), morgan('dev'), compression(), routes)

app.listen(port, host, () => {
    console.log('Servidor iniciado: ', host + ':' + port)
})
