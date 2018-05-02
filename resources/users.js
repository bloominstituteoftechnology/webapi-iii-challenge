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
  dbUser.insert(req.body) // must pass { name: "user_name_here" }
    .then(user => res.json(user)) // returns id
    .catch(err => res.status(500).json({ error: "Cannot add this user." }))
})

// update existing user
router.put('/update/:id', (req, res) => {
  const { name } = req.body; // must pass { name: "updated_name", id: ogID }
  const { id } = req.params;
  dbUser.update(id, req.body)
    .then(updated => res.json(updated)) // returns 1 for true, 0 for false
    .catch(err => res.status(500).json({ error: "Cannot uodate this user." }))
})

// delete user 
router.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  dbUser.remove(id)
    .then(removed => res.json(removed)) // returns 1 for true, 0 for false
    .catch(err => res.status(500).json({ error: "Cannot remove this user." }))
})

module.exports = router;