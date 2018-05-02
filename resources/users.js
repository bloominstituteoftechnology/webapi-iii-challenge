const express = require('express');
const dbUser = require('../data/helpers/userDb');
const router = express.Router();

// retrieve all users 
router.get('/', (req, res) => { 
  dbUser.get()
  .then(users => res.json(users))
  .catch(err => req.status(500).json({ error: "The users could not be retrieved." }))
})

// get users by id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  dbUser.get(id)
    .then(user => res.json(user)) // returns object with props id and name
    .catch(err => res.status(500).json({ error: "That user could not be retrieved." }))
})

// get user posts 
router.get('/:id/posts', (req, res) => {
  const { id } = req.params;
  dbUser.getUserPosts(id)
    .then(userPosts => res.json(userPosts)) // returns array of objects with props of id, text, postedBy
    .catch(err => res.status(500).json({ error: "Could not retrieve those posts." }))
})

// add new user
router.post('/new-user', (req, res) => {
  const { name } = req.body; // must pass { name: "user_name_here" }
  dbUser.insert(req.body)
    .then(user => res.json(user))
    .catch(err => res.status(500).json({ error: "Cannot add this user." }))
})

module.exports = router;