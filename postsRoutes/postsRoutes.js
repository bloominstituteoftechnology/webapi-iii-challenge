const express = require('express');

const router = express.Router();

const db = require('../data/helpers/postDb.js');

router.get('/', (req, res) => {
  db.get()
  .then(posts => res.json(posts))
  .catch(error => {
    res.status(500).json({ error: "The posts information could not be retrieved." })
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  
  db.get(id)
  .then(post => res.json(post))
  .catch(error => console.log(error));
});

module.exports = router;