const express = require('express')

const configureMiddleware = require('./config/middleware.js')
const usersRouter = require('./routes/usersRouter.js')
const postsRouter = require('./routes/postsRouter.js')

const server = express()

configureMiddleware(server)

// configure routes
server.use('/users', usersRouter)
server.use('/posts', postsRouter)

// verification server is live
server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' })
})

// export server
module.exports = server
