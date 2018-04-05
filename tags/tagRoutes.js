const express = require('express');

const router = express.Router();

const db = require('../data/helpers/tagDb.js');

//endpoint for /api/posts

//GET REQUEST
router.get('/', (req, res) => {
  db
    .get()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      res.status(500).json({ error: 'The posts could not be retrieved' });
    });
});

router.get('/:postId/', (req, res) => {
  const { postId } = req.params;

  db
    .get(postId)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      res.status(500).json({ error: 'The posts could not be retrieved' });
    });
});

router.get('/:postId/tags', (req, res) => {
  const { postId } = req.params;

  db
    .getPostTags(postId)
    .then((tags) => {
      res.status(200).json(tags);
    })
    .catch((error) => {
      res.status(500).json({ error: 'The users posts could not be retrieved' });
    });
});

// //GET DELETE

router.delete('/:postId', (req, res) => {
  const { postId } = req.params;

  db
    .remove(postId)
    .then((post) => {
      if (post > 0) {
        res.status(200).json({ message: 'Post deleted successfully!' });
      } else {
        res.status(404).json({ error: 'Post not found' });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: 'The Post could not be retrieved' });
    });
});

// //GET POST

router.post('/', (req, res) => {
  const post = req.body;

  if (!req.body.text || !req.body.userId) {
    res.status(400).json({ errorMessage: 'UserId and text required' });
    return;
  }

  db
    .insert(post)
    .then((post) => {
      res.status(201).json({ message: 'Created a new post successfully ' });
    })
    .catch((error) => {
      res.status(500).json({ error: 'The new post could not be created' });
    });

  // res.json({q:2});
});

// //GET PUT

router.put('/:postId', (req, res) => {
  const { postId } = req.params;
  const updatedPost = req.body;

  db
    .update(postId, updatedPost)
    .then((updates) => {
      res.status(200).json(updatedPost);
    })
    .catch((error) => {
      res.status(500).json({ error: 'The new users could not be retrieved' });
    });
  // res.json({q:2});
});

module.exports = router;
