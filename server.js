const express = require('express');
const bodyParser = require('body-parser');

// const postDb = require('./data/helpers/postDb.js');
// const tagDb = require('./data/helpers/tagDb.js');
// const userDb = require('./data/helpers/userDb.js');

const userRouter = require('./users/userRouter.js');
const postRouter = require('./posts/postRouter.js');
const tagRouter = require('./tags/tagRouter.js');

const server = express();

function logger(req, res, next) {
  console.log(`requesting: ${req.url}`);

  next();
}

//middleware
server.use(express.json());
server.use(logger);

server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);
server.use('/api/tags', tagRouter);

const port = 5000;
server.listen(port, () => console.log('API Running on port 5000'));

