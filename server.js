const express = require('express')

const server = express();

const userRouter = require('./users/userRouter.js');

server.use(logger);

server.use('/api/users', userRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});


//custom middleware


function logger(req, res, next) {
  const time = new Date();
  console.log(`${req.method} ${req.url} ${time}`);
  next();

};



module.exports = server;