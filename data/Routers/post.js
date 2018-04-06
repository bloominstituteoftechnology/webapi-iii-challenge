const express = require('express');
const router = express.Router();

const db = require('../helpers/postDb.js');

router.get('/', (req, res) => {
  db
    .get()
    .then(posts => {
      res.json(posts);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
