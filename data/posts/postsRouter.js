const express = require('express');

const Posts = require('../helpers/postDb');

const router = express.Router();

//************************** GET ALL POSTS *************************/
router.get('/', async (req, res) => {
  Posts.get()
    .then(posts => {
      res.status(200).json({ posts });
    })
    .catch(err => {
      res.status(500).json({ error: 'Cannot retrieve Posts.' });
    });
});

//************************** GET SPECIFIC POST *************************/
router.get('/:id', (req, res) => {
  Posts.getById(req.params.id)
    .then(post => {
      if (post) {
        res.status(200).json({ post });
      } else {
        res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist.' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'The Post could not be retrieved.' });
    });
});

//************************** ADD NEW POST *************************/
router.post('/', (req, res) => {
  const { text, user_id } = req.body;
  const newPost = { text, user_id };

  Posts.insert(newPost)
    .then(newPost => {
      if (!text || !user_id) {
        res
          .status(417)
          .json({ errorMessage: 'Please insert text for this post.' });
      }
      res.status(201).json({ newPost });
    })
    .catch(err => {
      res.status(500).json({ error: 'The Post could not be saved.' });
    });
});

//************************** UPDATE POST *************************/
router.put('/:id', (req, res) => {
  const postId = req.params.id;
  const { text, user_id } = req.body;
  const updatePost = { text, user_id };

  Posts.update(postId, updatePost)
    .then(updatedPost => {
      if (!updatedPost) {
        res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist.' });
      } else if (!req.body) {
        res
          .status(417)
          .json({ errorMessage: 'Please insert a text and Id for this post.' });
      } else {
        res.status(200).json({ message: 'Post updated', updatedPost });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: 'The post information could not be modified.' });
    });
});

//************************** DELETE POST *************************/
router.delete('/:id', (req, res) => {
  const postId = req.params.id;

  Posts.remove(postId)
    .then(deleted => {
      if (!deleted) {
        res
          .status(404)
          .json({ message: `The post with the specified ID '${postId}' does not exist.` });
      } else {
        res.status(200).json({ message: `Post with ID '${postId}' Deleted!`, deleted });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'The post could not be deleted.' });
    });
});

module.exports = router;
