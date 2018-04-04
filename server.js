const express = require('express');
// const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const usersRouter = require('./users/usersRouter.js');
const postsRouter = require('./posts/postsRouter.js');
// const tagsRouter = require('./tags/tagsRouter.js');

// const userDb = require('./data/helpers/userDb.js');
// const postDb = require('./data/helpers/postDb.js');
// const tagDb = require('./data/helpers/tagDb.js');

const server = express();

// custom middleware [m1, m2, mn] -> [request handlers]
function logger(req, res, next) {
  //next points to the next middleware
  console.log(`requesting: ${req.url}`);
  console.log('params: ', req.params);
  // res.send('done');
  // req.url = `${req.url}/1`; //changes the url of the request.
  next();
}

server.use(helmet());
// server.use(morgan());
server.use(cors());
server.use(express.json());
server.use(logger);

server.use('/api/users', usersRouter);
server.use('/api/posts', postsRouter);

const port = 5012;
server.listen(port, () => console.log('API running on port 5012'));
