const express = require('express');

const router = express.Router();
const postDb = require('../data/helpers/postDb');

// Middleware
router.use(express.json());

router.get('/', (req, res) => {
  postDb
    .get()
    .then((posts) => {
      console.log('** posts **\n', posts);
      res.status(200).json(posts);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ error: 'The posts information could not be retrieved.' });
    });
});

router.post('/', (req, res) => {
  // console.log('req.body', req.body);
  const { text, userId } = req.body;
  if (!text || !userId) {
    return res.status(400).send({
      errorMessage: 'Please provide text and user id for the post.',
    });
  }
  const newPost = { text, userId };
  postDb
    .insert(newPost)
    .then((response) => {
      res.status(201).json(response);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ error: 'The post information could not be saved.' });
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  postDb
    .remove(id)
    .then((removed) => {
      // console.log(removed);
      if (!removed) {
        return res.status(404).send({
          message: 'The post with the specified ID does not exist.',
        });
      }
      res.status(200).json({ message: 'Post has been deleted' });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: 'The post could not be removed',
      });
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  if (!text) {
    return res.status(400).send({
      errorMessage: 'Please provide title and contents for the post.',
    });
  }
  const newPost = { text };
  console.log('newPost', newPost);
  postDb
    .update(id, newPost)
    .then((post) => {
      console.log('post', post);
      if (!post) {
        return res.status(404).send({
          message: 'The post with the specified ID does not exist.',
        });
      }
      res.status(200).json(newPost);
    })
    .catch((err) => {
      res.status(500).json({
        error: 'The post information could not be modified.',
      });
    });
});

module.exports = router;
