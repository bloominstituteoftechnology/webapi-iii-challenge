const express = require('express');
const router = express.Router();

const db = require('../data/helpers/postDb');
const error = require('./helpers/error');

// GET http://localhost:5000/api/posts/1

/*************************
** ROUTE /:id **
*************************/
// get
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.get(id)
    .then(data => res.json(data))
    .catch(err => error(res, 500, 'Could not process your request. If this issue persists, please contact the owner of the site'));
})

module.exports = router;