const express = require('express');

const router = express.Router();

const postDb = require('../data/helpers/postDb.js');

// Get all posts
router.get('/', (req, res) => {
  postDb
    .get()
    .then(posts => {
      res.json(posts);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// Get post by id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  postDb
    .get(id)
    .then(posts => {
      res.json(posts);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// Get post tags
router.get('/:id/tags', (req, res) => {
  const { id } = req.params;
  postDb
    .getPostTags(id)
    .then(posts => {
      res.json(posts);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// Add a new post
// Working, but not checking userDb to make sure id exists. Need to implement
router.post('/', (req, res) => {
  const { text, userId } = req.body;
  const post = {
    text,
    userId,
  }

  postDb
    .insert(post)
    .then(response => {
      res.status(201).json(response);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// Delete a post
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  postDb
    .remove(id)
    .then(users => {
      res.json(users);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;