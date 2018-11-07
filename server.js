const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
// const capitalize = require('./middleware/capitalize');

const postDb = require('./data/helpers/postDb.js')
const userDb = require('./data/helpers/userDb.js')

const server = express();
server.use(express.json());
server.use(helmet());
server.use(morgan('short'));
server.use(cors());

function capitalize(req, res, next) {
  let name = req.body.name;
  name = name.split(" ").map(item => {
    return item = item.substring(0,1).toUpperCase() + item.substring(1);
  }).join(" ");
  req.body.name = name;
  next();
}



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

server.post('/users', capitalize, (req, res) => {
  const userData = req.body;
  userDb
    .insert(userData)
    .then(userId => res.status(201).json(userId))
    .catch(err => res.status(500).json({ message: 'there was an error adding the user' }))
})

server.delete('/users/:id', (req, res) => {
  const id = req.params.id;
  userDb
    .remove(id)
    .then(count => res.status(200).json(count))
    .catch(err => res.status(500).json({ message: 'there was an error deleting the user'}))
})

server.put('/users/:id', capitalize, (req, res) => {
  const id = req.params.id;
  const userUpdate = req.body;
  userDb
    .update(id, userUpdate)
    .then(count => res.status(201).json(count))
    .catch(err => res.status(400).json({ message: 'could not update user' }))
})

module.exports = server;
