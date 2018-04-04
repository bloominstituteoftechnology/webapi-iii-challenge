const express = require('express');

const tagsRouter = express.Router();

const db = require('../data/helpers/tagDb.js');

tagsRouter.get('/', (req, res) => {
  db
    .get()
    .then(tags => {
      res.json(tags);
    })
    .catch(error => {
      res.status(500).json(error);
    });
})

module.exports = tagsRouter;