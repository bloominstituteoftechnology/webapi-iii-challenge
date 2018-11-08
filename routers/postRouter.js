const express = require('express');
const post = require('../data/helpers/postDb.js');

const router = express.Router();

router.get('/', (req, res) => {
    const { id } = req.params;
    post.get(id)
      .then(posts => {
        res.status(200).json(posts);
      })
      .catch(err => {
        res
          .status(500)
          .json({ message: "we failed you, can't get the post", error: err });
      });
  });
  
  router.get('/:id', (req, res) => {
    const { id } = req.params;
  
    post.get(id)
      .then(post => {
        if (post) {
          res.status(200).json(post);
        } else {
          res.status(404).json({ message: 'post not found' });
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ message: "we failed you, can't get the post", error: err });
      });
  });

  router.get('/tags/:id', (req, res) => {
    const { id } = req.params;
    post.getPostTags(id)
      .then(postTags => {
        if (postTags === 0) {
          return errorHelper(404, 'Post not found', res);
        }
        res.status(200).json(postTags);
      })
      .catch(err => {
        res.status(500).json({ message: 'error getting the tag', err });
      });
  });
  
  router.post('/', async (req, res) => {
    console.log('body', req.body);
    try {
      const postData = req.body;
      const postId = await post.insert(postData);
      const posts = await post.get(postId.id);
      res.status(201).json(posts);
    } catch (error) {
      let message = 'error creating the post';
  
      if (error.errno === 19) {
        message = 'please provide both the name and the userId';
      }
  
      res.status(500).json({ message, error });
    }
  });

  router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    post.update(id, changes)
    .then(count => {
      if (count) {
        res.status(200).json({ message: `${count} posts updated` });
      } else {
        res.status(404).json({ message: 'Post not found' })
      }
      
    })
    .catch(err => {
      res.status(500).json({ message: 'error updating post', err });
    })
  });
  
  router.delete('/:id', (req, res) => {
    post.remove(req.params.id)
      .then(count => {
        res.status(200).json(count);
      })
      .catch(err => {
        res.status(500).json({ message: 'error deleting post', err });
      });
  });

  module.exports = router;
