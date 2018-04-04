const express = require('express');

const postsRouter = express.Router();

const db = require('../data/helpers/postDb.js');

postsRouter.get('/', (req, res) => {
  db
    .get()
    .then(posts => {
      res.json(posts);
    })
    .catch(error => {
      res.status(500).json(error);
    });
})

module.exports = postsRouter;