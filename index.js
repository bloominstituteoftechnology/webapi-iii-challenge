'use strict'

const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const userRoutes = require('./routes/users')

const PORT = 9000
const server = express()

server.use(helmet())
server.use(express.json())
server.use(cors())
server.use(morgan('dev'))

// Setting up the routes
server.use('/api/users', userRoutes)

server.get('/', (req, res) => res.send('Running'))

server.listen(PORT, () => console.log(`SERVER is running on PORT ${PORT}`))