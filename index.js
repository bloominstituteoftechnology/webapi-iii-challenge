// Middleware
const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const helmet = require('helmet');

// Server helpers
const userdb = require('./data/helpers/userDb');
const postdb = require('./data/helpers/postDb');

// Server init
const server = express();
server.use(logger('combined'));
server.use(cors());
server.use(express.json());

/// User Routes ///

// GET request to root
server.get('/', (req, res) => {
  res.send('Successfully made GET request to root');
});

// GET request to pull up all users
server.get( '/users', (req, res) => {
  userdb
    .get()
    .then(users => res.status(200).json(users))
    .catch(err => console.log(err));
});

// GET request to pull up a specific user by ID
server.get('/users/:id', (req, res) => {
  userdb
    .get(req.params.id)
    .then(user => res.status(200).send(user))
    .catch(err => res.status(500).send(err));
});

///////

