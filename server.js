const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const userRouter = require('./users/userRouter.js');
const postRouter = require('./posts/postRouter.js');
const tagRouter = require('./tags/tagRouter.js');

const server = express();

function logger(req, res, next) {
  console.log(' requesting: ${req.url}');

  next();
}

//middleware
server.use(helmet());
server.use(morgan('dev'));
server.use(express.json());
server.use(logger);
server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);
server.use('/api/tags', tagRouter);

server.get('/', (req, res) => {
  res.json({ api: 'Connected.....' });
});

const port = 5000;
server.listen(port, () => console.log('API Running on port 5000'));
