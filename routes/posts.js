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
});

// insert
router.post('/:userId', (req, res) => {
  const { userId } = req.params;
  const { text } = req.body;
  const post = { userId, text };
  db.insert({ userId, text })
    .then(data => {
      if (!text) {
        return error(res, 400, 'Please provide some content before attempting to create a new post');
      }
      res.json(data);
    })
    .catch(err => error(res, 500, 'Could not process your request. If this issue persists, please contact the owner of the site'));
});

// update
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  db.update(id, { text })
    .then(data => {
      if (!data) {
        return error(res, 404, 'This post does not exist.. or maybe it never did?');
      }
      if (!text) {
        return error(res, 400, 'Please provide some content before attempting to change a post');
      }
      res.json(data);
    })
    .catch(err => error(res, 500, 'Could not process your request. If this issue persists, please contact the owner of the site'));
});

// remove
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(data => {
      if (!data) {
        error(res, 404, 'This post does not exist.. or maybe it never did?');
      }
      res.json(data);
    })
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