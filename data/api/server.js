//import node mods
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const userDb = require('../helpers/userDb.js');


//const gatekeeper = require('../gatekeeper/middleware.js');

const server = express();

//middleware
server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));

//custom here
//global middleware
//server.use(gatekeeper);

// configure endpoints (route handlers are middleware!!)
server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

//get list of users
server.get('/api/users', (req, res) => {
  userDb.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ error: "The user information could not be retrieved." })
    })
});

//get user by id
server.get('/api/users/:id', (req, res) => {
  const { id } = req.params; //id is a parameter

  userDb.get(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "The user with the specified ID does not exist."});
      }
    })
    .catch(err => {
      res.status(500).json({ error: "The user information could not be retrieved."})
    })
});

module.exports = server;