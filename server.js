const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const usersRouter = require('./users/usersRouter.js');
const postsRouter = require('./posts/postsRouter.js');
const tagsRouter = require('./tags/tagsRouter.js');

// const userDb = require('./data/helpers/userDb.js');
// const postDb = require('./data/helpers/postDb.js');
// const tagDb = require('./data/helpers/tagDb.js');

const server = express();

// custom middleware [m1, m2, mn] -> [request handlers]
function tagToUpperCase(req, res, next) {
  if (req.body.tag) {
    req.body.tag = req.body.tag.toUpperCase();
  }

  next();
}

server.use(helmet());
server.use(morgan('dev'));
server.use(cors());
server.use(express.json());
server.use(tagToUpperCase);

server.use('/api/users', usersRouter);
server.use('/api/posts', postsRouter);
server.use('/api/tags', tagsRouter);

const port = 5012;
server.listen(port, () => console.log('API running on port 5012'));
