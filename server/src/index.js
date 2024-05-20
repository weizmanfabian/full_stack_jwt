require('dotenv').config();
const config = require('./config')
const cors = require('cors')
const express = require('express')
const app = express()

app.use(cors())

app.use(express.json()) //para recibir datos en el body en formato json

app.use('/login', require('./api/login.route'))
app.use('/api', require('./api/routes'))

app.set('port', config.app.port)

app.listen(config.app.port, () => console.log(`Server listening on port ${config.app.port}`))
