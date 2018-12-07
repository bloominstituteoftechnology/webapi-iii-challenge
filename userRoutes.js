const express = require('express');

const userDB = require('./data/helpers/userDb');

const router = express.Router();

router.get('/', (req, res) => {
  userDB
    .get()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json({ error: 'Error getting user' });
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  userDB
    .get(id)
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        res
          .status(404)
          .json({ message: 'User with specified ID is not found' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'Could not get user' });
    });
});

router.get('/posts/:id', (req, res) => {
  const { id } = req.params;
  userDB.getUserPosts(id).then(posts => {
    res.json(posts);
  });
});

router.post('/', (req, res) => {
  const user = req.body;
  if (user.name) {
    userDB
      .insert(user)
      .then(user => {
        res.json(user);
      })
      .catch(err => {
        res.status(500).json({ error: 'Could not add user' });
      });
  } else {
    res.status(400).json({ message: 'Please make sure a name is entered' });
  }
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  userDB
    .remove(id)
    .then(count => {
      if (count) {
        res.json({
          message: `User with the ID of ${id} has been deleted successfully`
        });
      } else {
        res
          .status(404)
          .json({ error: 'user with specified ID does not exist' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'Could not delete' });
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const user = req.body;
  if (user.name) {
    userDB
      .update(id, user)
      .then(count => {
        if (count) {
          userDB.get(id).then(user => {
            res.json(user);
          });
        } else {
          res
            .status(404)
            .json({ message: `User with an ID of ${id} does not exist` });
        }
      })
      .catch(err => {
        res.status(500).json({ error: 'The user data could not be found' });
      });
  } else {
    res.status(400).json({ message: 'Please provide a name' });
  }
});

module.exports = router;
