// Server Imports
const express = require('express');
const postDb = require('./data/helpers/postDb.js');
const tagDb = require('./data/helpers/tagDb.js');
const userDb = require('./data/helpers/userDb.js');

// Server
const server = express();

// Middleware
server.use(express.json());

// Server Code
server.get('/', (req, res) => { // API Check
  res.json({ api: 'Running..' });
});

server.get('/api/users/', (req, res) => { // Grab all Users

  userDb
    .get()
    .then(response => {
      res.json(users);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// Port
const port = 5000;
server.listen(port, () => console.log('API Running on port 5000'));