const express = require('express');

const router = express.Router();

const postDb = require('../data/helpers/postDb.js');

// READ posts
router.get('/', (req, res) => {
  postDb
    .get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// READ post by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  postDb
    .get(id)
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// READ post by tag
router.get('/:id/tag', (req, res) => {
  const { id } = req.params;
  postDb
    .getPostTags(id)
    .then(users => {
      console.log('test');
      res.status(200).json(users);
    })
    .catch(error => {
      console.log('error');
      res.status(500).json(error);
    });
});

// CREATE post
router.post('/', (req, res) => {
  const { id } = req.params;
  const post = req.body;
  postDb
    .insert(post)
    .then(id => {
      res.status(201).json(id);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// UPDATE post
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const post = req.body;
  postDb
    .update(id, post)
    .then(id => {
      res.status(200).json(id);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// DELETE post
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const post = req.body;
  postDb
    .remove(id)
    .then(id => {
      res.status(200).json(id);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
