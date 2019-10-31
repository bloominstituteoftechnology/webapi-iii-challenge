const express = require('express');

const server = express();
server.use(express.json());
//Import Routers
const userRouter = require('./users/userRouter.js');
// const postRouter = require('./posts/postRouter.js');

//Import Custom Middleware
// const logger = require('./middleware/logger');
// const validateUserId = require('./middleware/validateUserId');
// const validateUser = require('./middleware/validateUser');
// const validatePost = require('./middleware/validateUser');

server.use('/api/user', userRouter);

// const validateUserId = require('./users/userRouter.js');
// server.use('/api/post', postRouter);

server.use(logger);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware
function logger(req, res, next){
  console.log(
    `${req.method} to ${req.url} from ${req.get('Origin')}`
  )
  next();
}

module.exports = server;
