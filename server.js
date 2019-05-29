const express = require("express");
const helmet = require("helmet");

const server = express();
server.use(express.json());
server.use(helmet());
server.use(logger);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`a ${req.method} request ${req.url}`);
  next(); // Allow us to contiune to the next middleware.
}

module.exports = server;
