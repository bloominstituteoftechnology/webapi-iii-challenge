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

  router.get('/api/users/posts/:userId', (req, res) => {
    const { postId } = req.params;
    post.getUserPosts(postId)
      .then(usersPosts => {
        if (usersPosts === 0) {
          return errorHelper(404, 'No posts by that user', res);
        }
        res.json(usersPosts);
      })
      .catch(err => {
        res.status(500).json({ message: "could not find the user's post", err });
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
        res.status(200).json({ message: `${count} users updated` });
      } else {
        res.status(404).json({ message: 'User not found' })
      }
      
    })
    .catch(err => {
      res.status(500).json({ message: 'error deleting user', err });
    })
  });
  
  router.delete('/:id', (req, res) => {
    post.remove(req.params.id)
      .then(count => {
        res.status(200).json(count);
      })
      .catch(err => {
        res.status(500).json({ message: 'error deleting user', err });
      });
  });

  module.exports = router;
