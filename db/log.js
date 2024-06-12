function mongooseLogs(db) {
    db.on('error', console.log.bind(console, 'Erro de Conexão no MongoDB'))
    db.once('open', () => {
        console.log('mongodb OK')
    })
}

module.exports = mongooseLogs
