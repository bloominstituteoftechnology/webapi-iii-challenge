const express = require('express');
const db = require('../data/helpers/userDb.js');
const morgan = require('morgan');
const helmet = require('helmet');


const server = express();

// middleware
server.use(express.json());
server.use(morgan('dev'));
server.use(helmet());

// endpoints

const sendAllUsers = (req, res) => {
  db.get()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json({ message: `Internal server error. Could not get users`, error });
    });
}

const echo = (req, res) => {
  res.status(201).json({
    message: 'hey this endpoint work!',
    params: req.params,
    query: (req.query ? req.query : ''),
    body: req.body
  });
}

// bind user endpoints
server.get('/api/users', sendAllUsers);
server.get('/api/users/:id', echo);
server.post('/api/users', echo);
server.delete('/api/users/:id', echo);
server.put('/api/users/:id', echo);

// bind post endpoints
server.get('/api/posts', echo);
server.get('/api/posts/:id', echo);
server.post('/api/posts', echo);
server.delete('/api/posts/:id', echo);
server.put('/api/posts/:id', echo);

module.exports = server;
