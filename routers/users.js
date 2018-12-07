const express = require('express');
const userDb = require('../data/helpers/userDb');
const postDb = require('../data/helpers/postDb');

const router = express.Router();

// GET /api/user/:id
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

// GET /api/users/:userId
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

// CREATE /api/users/create
router.post('/create', (req, res) => {
  const user = req.body;
  if (user.name) {
    userDb
      .insert(user)
      .then(idInfo => {
        userDb.get(idInfo.id)
        .then(user => {
          res.status(201).json(idInfo);
        });
      })
      .catch(err => {
        res.status(500)
        .json({ message: 'failed to insert user into db'});
      });
  }
});

// DELETE /api/users/:id
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  userDb
    .remove(id)
    .then(count => {
      if (count) {
        res.json({ message: 'user successfully deleted' });
      } else {
        res
          .status(404)
          .json({ message: 'the user with the specified id does not exist' });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: 'user could not be deleted' });
    });
});

// UPDATE /api/users/:id
router.put('/:id', (req, res) => {
  const user = req.body;
  const { id } = req.params;
  if (user.name) {
    userDb.update(id, user)
      .then(count => {
        userDb.get(id)
          .then(user => {
            res
              .json(user);
          })
      })
      .catch(err => {
        res
          .status(400)
          .json({ message: 'please provide new name for user' });
      });
  } else {
    res
    .status(500)
    .json({ error: 'user information could not be modified.' });
  }
});

module.exports = router;
