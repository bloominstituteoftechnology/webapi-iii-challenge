const express = require('express');
const router = express.Router();
const userDb = require('../helpers/userDb.js');

//middleware
const nameUpper = require('../gatekeeper/middleware.js');

// /api/users/

//get list of users
router.get('/', (req, res) => {
  userDb.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ error: "The user information could not be retrieved." })
    })
});

//get user by id - not required
router.get('/:id', (req, res) => {
  const { id } = req.params; //id is a parameter

  userDb.get(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "The user with the specified ID does not exist."});
      }
    })
    .catch(err => {
      res.status(500).json({ error: "The user information could not be retrieved."})
    })
});

//add user
router.post('/', nameUpper, (req, res) => {
  userDb.insert(req.body)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({ message: "error adding user", err })
    })
})

//delete user
router.delete('/:id', (req, res) => {
  userDb.remove(req.params.id)
    .then(count => {
      res.status(200).json(count)
    }).catch (err => {
      res.status(500).json({ message: 'error deleting user '})
    })
})

module.exports = router;