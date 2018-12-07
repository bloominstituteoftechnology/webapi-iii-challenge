const express = require('express');
const userDb = require('../data/helpers/userDb');
const postDb = require('../data/helpers/postDb');

const router = express.Router();

// /api/user/:id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  console.log(id);
  userDb
    .get(id)
    .then(user => {
      if (user) {
        res.send(user);
      } else {
        res.status(404).json({message: 'user does not exist'});
      }
    })
    .catch(err => {
      res.status(500)
      .json({ message: 'unable to fullfill request' });
    });
});

// /api/users/:userId
router.get('/:userId/posts', (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  userDb
    .getUserPosts(userId)
    .then(posts => {
      res.send(posts);
    })
    .catch(err => {
      res.status(500)
      .json({ message: 'unable to get user posts' });
    });
});

module.exports = router;
