const express = require('express');
const router = express.Router();

const userDb = require('../data/helpers/userDb.js');

//View Users
router.get('/', (req, res) => {
  userDb
  .get()
  .then(users => {
    res.status(200).json({ users });
  })
  .catch(error => {
    res.status(500).json({ error: "Could not retreive users"})
  })
})

//View User by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  userDb
  .getUserPosts(id)
  .then(user => {
    if (user.length === 0) {
      res.status(404).json({ message: "The user with the specified ID does not exist." })
    } else {
      res.status(200).json({ user })
    }
  })
  .catch(error => {
    res.status(500).json({ error: "The user information could not be retrieved." })
  })
})

//Add New User
router.post('/', (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ errorMessage: "Please provide a name for the user." })
    return;
  }
  userDb
  .insert({ name })
  .then(user => {
    res.status(200).json({ user })
  })
  .catch(error => {
    res.status(500).json({ error: "There was an error while saving the user to the database" })
  })
})

//Update User
router.put('/:id', (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  if(!name) {
    res.status(400).json({ error: "Please provide a new name for this user"});
  }
  userDb
  .update(id, { name })
  .then(user => {
    if(user === 0) {
      res.status(404).json({ error: "The user with the specified ID does not exist" })
      return;
    }
    res.status(200).json({ user })
  })
  .catch(error => {
    res.status(500).json({ error: "There was an error while updating the name to the database" })
  })
})
//Delete a User
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  userDb
  .remove(id)
  .then(user => {
    if(!user) {
      res.status(404).json({ message: "The user with the specified ID does not exist." })
    } else {
      res.status(200).json({ user })
    }
  })
  .catch(error => {
    res.status(500).json({ error: "The user could not be removed" })
  })
})

module.exports = router;
