// Imports
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const userDb = require('./data/helpers/userDb.js');

// Create server
const server = express();

// Middleware
server.use(morgan('dev'));
server.use(helmet());
server.use(express.json());

// Routes
server.get('/api/users', (req, res) => {
  userDb.get()
    .then(users => res.status(200).json(users))
    .catch(error => res.status(500).json({ message: 'There has been an error getting the users.' }));
});



// Server export
module.exports = server;
