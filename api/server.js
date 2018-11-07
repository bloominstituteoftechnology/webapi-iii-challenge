const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const userDb = require('../data/helpers/userDb');
const postDb = require('../data/helpers/postDb');
const tagDb = require('../data/helpers/tagDb');

const server = express();



// configure middleware
server.use(express.json());
server.use(helmet());
server.use(morgan('short'));



// configure endpoints
// server.get('/', (req, res) => {
//   res.status(200).json({ api: 'running' });
// });

// get /users
server.get('/users', (req, res) => {
  userDb.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => { 
      res
      .status(500)
      .json(err);
    });
});

// get /users/:id

// get /users/:id/posts

// get /users/:userId/posts/:postId





module.exports = server