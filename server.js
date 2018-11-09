//Imports
const express = require('express')

const middlewareConfig = require('./thirdPartyMiddleware/configureTPMiddleware.js')
const userRoutes = require('./userRoutes/userRoutes.js')
const postRoutes = require('./postRoutes/postRoutes.js')

const server = express()

//Middleware Configuration
middlewareConfig(server)
// User End points
server.use('/users', userRoutes)
// Post End points
server.use('/posts', postRoutes)

module.exports = server;