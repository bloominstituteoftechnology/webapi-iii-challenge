const express = require('express');

const server = express();

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(req, res, next) {
  const {originalUrl, method} = req
  console.log(
  new Date().toISOString() `Accessed by ${method} from ${originalUrl}`
  )
  next()
};



server.use(express.json())
server.use(logger)

module.exports = server;
