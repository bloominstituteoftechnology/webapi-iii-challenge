const express = require('express');
// const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const userRouter = require('./users/userRoutes.js');
const postRouter = require('./users/postRoutes.js');
const tagRouter = require('./users/tagRoutes.js');

const server = express();

function logger(req, res, next) {
  console.log('body: ', req.body);
  // next points to the next middleware
  next();
}

server.use(helmet());
// server.use(morgan('combined'));
server.use(cors());
server.use(express.json());
server.use(logger);

server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);
server.use('/api/tags', tagRouter);

server.get('/', function(req, res) {
  res.json({ api: 'Running...' });
});

const port = process.env.PORT || 5000;
server.listen(port, () => console.log('API running on port 5000'));
