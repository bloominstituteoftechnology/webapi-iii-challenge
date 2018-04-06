const express = require('express');
const router = express.Router();

const db = require('../helpers/tagDb.js');

// Server
router.get('/', (req, res) => {
  db
    .get()
    .then(tags => {
      res.json(tags);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
