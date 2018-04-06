const express = require('express');

const helmet = require('helmet');
const cors = require('cors');


const postRouter = require('./posts/postRouter.js');
const tagRouter = require('./tags/tagRouter.js');
const userRouter = require('./users/userRouter.js');

const server = express();


function logger(req, res, next) {
  console.log('body: ', req.body);

  next();
};


server.use(cors());
server.use(helmet());
server.use(express.json());
server.use(logger);

server.use('/api/posts', postRouter);
server.use('/api/tags', tagRouter);
server.use('/api/users', userRouter);

const port = 5000;

server.listen(port, () => console.log('API up on port 5000'));
