const express = require('express');

const server = express();

//Import Routers
const userRouter = require('./users/userRouter.js');
const postRouter = require('./posts/postRouter.js');

//Import Custom Middleware
// const logger = require('./middleware/logger');
// const validateUserId = require('./middleware/validateUserId');
// const validateUser = require('./middleware/validateUser');
// const validatePost = require('./middleware/validateUser');

server.use('/api/user', userRouter);
server.use('/api/post', postRouter);
server.use(express.json());

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

module.exports = server;
