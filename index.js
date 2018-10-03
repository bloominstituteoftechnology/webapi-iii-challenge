// IMPORTS
const express = require('express');
const userDb = require('./data/helpers/userDb.js');
const postDb = require('./data/helpers/postDb.js');
const port = 8000;

// SETUP
const server = express();
server.use(express.json());

// ROUTE HANDLERS
server.route('/users')
  .get((req, res) => {
    userDb.get()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json({ error: "The requests for users could not be retrieved." }));
  })

server.route('/posts')
  .get((req, res) => {
    postDb.get()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json({ error: "The requests for posts could not be retrieved." }));
  })

// PORT LISTENERS
server.listen(port, () => console.log(`===${port} is online!===`))