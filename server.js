/* eslint-disable no-console */
const express = require('express');
const cors = require('cors');
const postDb = require('./data/helpers/postDb');
const userDb = require('./data/helpers/userDb');

const server = express();
server.use(express.json(), cors());

server.get('/users', (req, res) => {
  userDb
    .get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.log(err, res.status(500).json({ error: 'Error getting users from database' }));
    });
});

server.get('/users/:id', (req, res) => {
  userDb
    .get(req.params.id)
    .then(user => {
      !user ? res.status(404).json({ message: 'ID not found.' }) : res.status(200).json(user);
    })
    .catch(e => {
      console.log(e);
      res.status(500).json({ error: 'Error accessing database.' });
    });
});

server.listen(8000, () => {
  console.log('Running on port 8000');
});
