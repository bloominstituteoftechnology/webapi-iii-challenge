const express = require('express');
const postDb = require('../data/helpers/postDb.js');

const router = express.Router();

// Fetches all post
router.get('/', (req, res) => {
  postDb
    .get()
    .then(posts => res.status(200).json(posts))
    .catch(error => {
      res.status(500).json({ message: 'Error fetching all posts.', error });
    });
});
// Fetches specific post
router.get('/:id', (req, res) => {
  const id = req.params.id;

  postDb
    .get(id)
    .then(post => res.status(200).json(post))
    .catch(error => {
      res.status(200).json({ message: 'Error fetching all posts' });
    });
});
// Adds a new post
router.post('/', (req, res) => {
  const newPost = req.body;

  postDb
    .insert(newPost)
    .then(post => res.status(200).json(post))
    .catch(error => {
      res
        .status(500)
        .json({ message: 'There was an error adding the post', error });
    });
});
// Deletes post
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  postDb
    .remove(id)
    .then(count => {
      if (count) {
        res.status(200).json({
          message: `The post with the id of ${id} was deleted.`,
          count
        });
      } else {
        res
          .status(404)
          .json({ message: `User with the id of ${id} could not be found` });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: 'There was an error deleting the post.', error });
    });
});

module.exports = router;
