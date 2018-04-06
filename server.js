/* Express */
const express = require('express')
const server = express()
server.use(express.json())

/* Environment variables */
require('dotenv').config()
const { port } = require('./config/config')

/* Routes */
server.use('/', require('./api/routes'))

/* Middleware */
const { handleErrors } = require('./api/middleware')
server.use(handleErrors)

server.listen(port, () => console.log(`👋 Hey from port ${port}!`))
