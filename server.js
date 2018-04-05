const express = require('express');

const helmet = require('helmet');
// const morgan = require('morgan');
const cors = require('cors');

const usersRouter = require('./users/usersRouter.js');
const postsRouter = require('./users/postsRouter.js');
const tagRouter = require('./users/tagRouter.js');

const server = express();

function logger(req, res, next) {
  console.log('MW for', req.body);
  console.log(req.url);

  next();
}

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(logger);

server.use('/api/users', usersRouter);
server.use('/api/posts', postsRouter);
server.use('/api/tags', tagRouter);

server.get('/', function(req, res) {
  res.json({ api: 'Running...' });
});

const port = 5000;
server.listen(port, () => console.log('API Running on port 5000'));
