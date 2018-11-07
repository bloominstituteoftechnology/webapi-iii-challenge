const express = require('express');
const cors = require('cors');
const user = require('../data/helpers/userDb');
const post = require('../data/helpers/postDb');
const tag = require('../data/helpers/tagDb');

const server = express();

server.use(express.json());
server.use(cors());

server.get('/api/posts', (req, res) => {
  post
    .get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({
        message: 'The post information could not be retrieved.',
        error: err
      });
    });
});

server.get('/api/posts/:id', (req, res) => {
  res.send;
});

module.exports = server;
