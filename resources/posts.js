const express = require('express');
const dbPost = require('../data/helpers/postDb');
const router = express.Router();

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
  const post = req.body; // must pass { text: "insert content here", userId: *corresponding userID* }
  dbPost.insert(post) 
    .then(newPost => res.json(newPost)) // returns post ID
    .catch(err => res.status(500).json({ error: "Cannot post this." }))
})

module.exports = router;