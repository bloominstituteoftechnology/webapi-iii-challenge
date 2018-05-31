const express = require('express');
const router = express.Router();

const db = require('../data/helpers/postDb');
const error = require('./helpers/error');

// GET http://localhost:5000/api/posts/100/tags

/*************************
** ROUTE /:id **
*************************/
// get
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.get()
    .then(data => res.json(data))
    .catch(err => error(res, 500, 'Could not process your request. If this issue persists, please contact the owner of the site'));
});

/*************************
** ROUTE /:id/tags **
*************************/
// get
router.get('/:id/tags', (req, res) => {
  const { id } = req.params;
  db.getPostTags(id)
    .then(data => {
      if (data.length === 0) {
        return error(res, 404, 'Either this post doesn\'t exist, or it has yet to be tagged by the author');
      }
      res.json(data)
    })
    .catch(err => error(res, 500, 'Could not process your request. If this issue persists, please contact the owner of the site'));
})

module.exports = router;