const express = require('express')
const server = express()

const UserRouter = require('./users/userRouter')
const PostRouter = require('./posts/postRouter')

server.use(express.json())

//custom middleware
const warez = require('./middleware')
server.use(warez.logger)

//ROUTES
server.use('/api/users', UserRouter)
server.use('/api/posts', PostRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
})

module.exports = server