const express = require('express');
const router = express.Router();

const db = require('../data/helpers/tagDb');
const error = require('./helpers/error');

/*************************
** ROUTE / **
*************************/
// get
router.get('/', (req, res) => {
  db.get()
    .then(data => res.json(data))
    .catch(err => error(res, 500, 'Could not process your request. If this issue persists, please contact the owner of the site'));
});

// insert
router.post('/', (req, res) => {
  const { tag } = req.body;
  db.insert({ tag })
    .then(data => {
      if (!tag) {
        error(res, 400, 'Please provide a name before attempting to create a new tag');
      }
      res.json(data);
    })
    .catch(err => error(res, 500, 'Could not process your request. If this issue persists, please contact the owner of the site'));
});

/*************************
** ROUTE /:id **
*************************/
// get
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

// update
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { tag } = req.body;
  db.update(id, { tag })
    .then(data => {
      if (!data) {
        return error(res, 404, 'This tag no longer exists... or maybe it never did?');
      }
      res.json(data);
    })
    .catch(err => {
      if (!tag) {
        return error(res, 400, 'Please provide a new name before attempting to update a tag');
      }
      error(res, 500, 'Could not process your request. If this issue persists, please contact the owner of the site')
    });
});

module.exports = router;