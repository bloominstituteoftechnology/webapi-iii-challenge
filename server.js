const moment = require('moment')
const express = require('express');

const usersRoutes = require('./users/userRouter');
const postsRoutes = require('./posts/postRouter');

const server = express();
server.use(express.json());

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(req, res, next) {
  const method = req.method;
  const url = req.url;
  const timestamp = moment().format('MMMM Do YYYY, h:mm:ss a');;

  console.log(`you made a ${method} request to ${url} at ${timestamp}`);
  next();
};


server.use(logger)
server.use('/users', usersRoutes);
server.use('/posts', postsRoutes)



module.exports = server;