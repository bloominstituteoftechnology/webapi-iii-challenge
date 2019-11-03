const express = require('express');
const server = express();
const cors = require('cors')
server.use(express.json())
server.use(cors())
const userRoutes = require('./users/userRouter')

//CUSTOM MIDDLEWARE --- TOP LEVEL ---
server.use(function logger(req, res, next) {
  var origin = req.get('origin')
  console.log(`
  [${new Date().toISOString()}]
  ${req.method} to 
  ${req.url} from
  ${req.headers.host}     
  `)
  next()
})
server.use('/api/users', userRoutes)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

module.exports = server;
