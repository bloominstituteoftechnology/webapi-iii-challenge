const express = require('express');
const userDb = require('../data/helpers/userDb');

const server = express();
// --MIDDLEWARE--
server.use(express.json());

// --ENDPOINTS--
server.get('/api/users', (req, res) => {
  userDb
    .get()
    .then((users) => res.status(200).json({ users }))
    .catch((err) => {
      res.status(500).json({ message: 'could not find users', err });
    });
});

server.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  userDb
    .get(id)
    .then((user) => res.status(200).json({ user }))
    .catch((err) => {
      res.status(500).json({ message: 'could not find users', err });
    });
});

server.get('/api/users/:id/posts', (req, res) => {
  const userId = req.params.id;
  userDb
    .getUserPosts(userId)
    .then((userPosts) => res.status(200).json({ userPosts }))
    .catch((err) => {
      res.status(500).json({ message: 'no posts by this user', err });
    });
});

// --EXPORT--
module.exports = server;
