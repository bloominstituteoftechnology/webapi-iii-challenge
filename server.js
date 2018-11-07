const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const capitalize = require('./middleware/capitalize');

const postDb = require('./data/helpers/postDb.js')
const userDb = require('./data/helpers/userDb.js')

const server = express();
server.use(express.json());
server.use(helmet());
server.use(morgan('short'));
server.use(cors());

// server.use(capitalize);

server.get('', (req, res) => {
  res.status(200).json({ message: 'hi there!' })
})
server.get('/users', (req, res) => {
  userDb
    .get()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json({ message: 'there was an error retrieving the users' }))
})

server.get('/users/:id', (req, res) => {
  const id = req.params.id;
  userDb
    .get(id)
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json({ message: 'there was a problem retrieving the user' }))
})

module.exports = server;
