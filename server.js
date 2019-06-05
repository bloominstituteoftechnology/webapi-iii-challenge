const express = require('express');
const helmet = require('helmet')
const server = express();

server.use(express.json());
server.use(helmet());
server.use(logger);


server.get('/', logger, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(req, res, next) {
  console.log(`A ${req.method} request to '${req.url}' at '${Date.now()}'`);
  next();
};

module.exports = server;
