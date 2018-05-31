const express = require('express');
const router = express.Router();

const db = require('../data/helpers/tagDb');
const error = require('./helpers/error');

/*************************
** GET /:id **
*************************/
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.get(id)
    .then(data => {
      if (!data) {
        error(res, 404, 'This tag no longer exist.. or maybe it never did?');
      }
      res.json(data);
    })
    .catch(err => error(res, 500, 'Could not process your request. If this issue persists, please contact the owner of the site'));
});

module.exports = router;