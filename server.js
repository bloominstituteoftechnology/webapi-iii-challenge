const express = require('express');

const PostRouter = require('./posts/postRouter.js');

const UserRouter = require('./users/userRouter.js');

const server = express();

server.use(express.json());
server.use(logger);

server.use('/api/posts', PostRouter);

server.use('/api/users', UserRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(req, res, next) {
  console.log(req.method)
  next()
};

module.exports = server;
