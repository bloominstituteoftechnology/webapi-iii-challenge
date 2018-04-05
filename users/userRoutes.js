const express = require('express');

const router = express.Router();

const userDb = require('../data/helpers/userDb.js');

// READ Users
router.get('/', (req, res) => {
  userDb
    .get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// READ User By ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  userDb
    .get(id)
    .then(users => {
      res.json(users);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// READ User Posts
router.get('/:id/posts', (req, res) => {
  const { id } = req.params;
  userDb
    .getUserPosts(id)
    .then(users => {
      res.json(users);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// CREATE User
router.post('/', (req, res) => {
  const user = req.body;
  userDb
    .insert(user)
    .then(users => {
      console.log('then test');
      res.status(201).json(users);
    })
    .catch(error => {
      console.log('catch test');

      res.status(500).json(error);
    });
});

// UPDATE User
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const user = req.body;
  userDb
    .update(id, user)
    .then(count => {
      if (count > 0) {
        userDb.get(id).then(user => {
          res.status(200).json(user);
        });
      } else {
        res
          .status(404)
          .json({ message: 'The user with the specified ID does not exist.' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// DELETE User
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  console.log(id);
  userDb
    .remove(id)
    .then(users => {
      res.status(200).json({ users });
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
