const express = require('express');

const postDB = require('./data/helpers/postDb');
const userDB = require('./data/helpers/userDb');

const router = express.Router();

router.get('/:id', (req, res) => {
  const { id } = req.params;
  postDB
    .get(id)
    .then(post => {
      res.send(post);
    })
    .catch(err => {
      res.status(500).json({ message: 'Could not get posts' });
    });
});

router.post('/', (req, res) => {
  const post = req.body;
  const id = req.body.userId;
  if (post.userId && post.text) {
    userDB.get(id).then(user => {
      if (!user) {
        res
          .status(404)
          .json({ error: 'User with specified ID does not exist' });
      }
    });
    postDB
      .insert(post)
      .then(post => {
        res.json(post);
      })
      .catch(err => {
        res.status(500).json({ message: 'Could not add post' });
      });
  } else {
    res
      .status(404)
      .json({ error: 'please provide a userId and test for the post' });
  }
});

module.exports = router;
