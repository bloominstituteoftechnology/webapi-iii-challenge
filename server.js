const express = require('express');
const time = require("express-timestamp");
const userDb = require("./users/userDb.js")
const postDb = require("./posts/postDb.js")
const validateUser = require("./users/userRouter.js")

const server = express();
server.use(time.init);
//custom middleware

function logger(req, res, next) {
  console.log(`method: ${req.method}`)
  console.log(`url: ${req.path}`)
  console.log(`time: ${req.timestamp}`); 
  next();
};
server.use(logger);
server.use('/users', validateUser)

server.get('/users', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
