const express = require('express');
const router = express.Router();

const db = require('../helpers/userDb.js');

// Server
router.get('/', (req, res) => {
  db
    .get()
    .then(users => {
      res.json(users);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
