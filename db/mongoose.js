const mongoose = require('mongoose')

if (!process.env.MONGODB_URL) {
    throw new Error('MONGODB_URL não configurado')
}

mongoose.connect(process.env.MONGODB_URL)

const db = mongoose.connection

db.on('error', console.log.bind(console, 'Erro de Conexão no MongoDB'))

db.once('open', () => {
    console.log('mongodb OK')
})

module.exports = db
