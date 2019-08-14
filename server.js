const express = require('express');
const helmet = require('helmet')
const bodyParser = express.json()

const server = express();
const userRouter = require('./users/userRouter')

server.use(bodyParser)
server.use(helmet())
server.use(logger)

server.use('/api/users', userRouter)


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(req, res, next) {
  const time = new Date().toLocaleTimeString()
  const date = new Date().toLocaleDateString()
  console.log(`${req.method} Request | http://localhost:4000${req.url} | ${date} , ${time}`)
  next()
};

module.exports = server;
