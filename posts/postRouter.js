const express = require('express');

const router = express.Router();

const db = require('../data/helpers/postDb.js');

router.get('/', (req, res) => {
  db
    .get()
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(500).json(error));
});

router.get('/:id/tags', (req, res) => {
  const { id } = req.params;

  db
    .getPostTags(id)
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(500).json(error));
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  db
    .get(id)
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(500).json(error));
});

router.post('/', (req, res) => {
  const post = req.body;

  db
    .insert(post)
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(500).json(error));
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const updatedPost = { post, id };

  db
    .update(id, updatedPost)
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(500).json(error));
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;

  db
    .remove(id)
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(500).json(error));
});

module.exports = router;
