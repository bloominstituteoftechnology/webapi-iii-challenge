
const express = require('express');


const userRouter = require('./users/userRouter')
const postRouter = require('./posts/postRouter')

const server = express();



server.use(logger)
server.use(express.json())
server.use('/users', userRouter)
server.use(postRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(req, res, next) {
    console.log(`The logger: [${new Date().toISOString()}] ${req.method} to ${req.url}`)
    // console.log(req.originalUrl)

    next()
};

module.exports = server;
