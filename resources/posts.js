const express = require('express');
const dbPost = require('../data/helpers/postDb');
const dbUsers = require('../data/helpers/userDb');
const router = express.Router();

// const existingUsers = dbUsers.get().then(users => res.json(users)).catch(err => res.json({ error: "Could not retrieve users." }))

// retrieve all posts
router.get('/', (req, res) => {
  dbPost.get()
    .then(posts => res.json(posts))
    .catch(err => res.status(500).json({ error: "The posts could not be retrieved." }))
})

// gets posts via id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  dbPost.get(id)
    .then(post => res.json(post)) // returns object with props text, postedBy, tags (array)
    .catch(err => res.status(500).json({ error: "We're having trouble retrieving that post." }))
})

// get post tags
router.get('/:id/tags', (req, res) => {
  const { id } = req.params;
  dbPost.getPostTags(id)
    .then(tags => res.json(tags)) // returns array of objects with prop "tag" ... one tag per object
    .catch(err => res.status(500).json({ error: "We could not find any tags." }))
})

// add post
router.post('/newpost', (req, res) => {
  dbUsers.get()
    .then(users => users.filter(user => user.id === req.body.userId))
    .then(response => response.length > 0 ?
      dbPost.insert(req.body)
        .then(result => res.json(result))
        .catch(err => res.json({ error: "Something went wrong while attempting to add this post." })) :
      res.json({ error: "That user ID does not exist." })
    )
    .catch(err => res.json({ error: "The users could not be retrieved." }))
})


// update post 
router.put('/:id/update', (req, res) => {
  const { id } = req.params; // post ID
  const updated = req.body; // must pass { text: "content" }
  dbPost.update(id, updated)
    .then(updated => res.json(updated))
    .catch(err => res.status(500).json({ error: "Cannot update this post." }))
})

// delete post
router.delete('/:id/delete', (req, res) => {
  const { id } = req.params; // must pass post id ... represented as "id"
  dbPost.remove(id)
    .then(removed => res.json(removed)) // returns 1 for success, 0 for failure
    .catch(err => res.status(500).json({ error: "Cannot delete this post." }))
})

module.exports = router;