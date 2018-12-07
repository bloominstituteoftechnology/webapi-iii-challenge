const express = require('express');

const postDB = require('./data/helpers/postDb');

const router = express.Router();

router.get('/:id', (req, res) => {
  const { id } = req.params;
  postDB
    .get(id)
    .then(post => {
      res.send(post);
    })
    .catch();
});

module.exports = router;
