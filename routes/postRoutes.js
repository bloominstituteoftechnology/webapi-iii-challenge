const express = require('express');
const router = express.Router();

const postDb = require('../data/helpers/postDb.js');

//View Posts
router.get('/', (req, res) => {
  postDb
  .get()
  .then(posts => {
    res.status(200).json({ posts });
  })
  .catch(error => {
    res.status(500).json({ error: "Could not retreive posts"})
  })
})

//View Post by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  postDb
  .get(id)
  .then(post => {
    if (post.length === 0) {
      res.status(404).json({ message: "The post with the specified ID does not exist." })
    } else {
      res.status(200).json({ post })
    }
  })
  .catch(error => {
    res.status(500).json({ error: "The post information could not be retrieved." })
  })
})

//View a Post's Tags
router.get('/:id/tags', (req, res) => {
  postDb
  .getPostTags(id)
  .then(post => {
    if (post.length === 0) {
      res.status(404).json({ message: "The post with the specified ID does not exist." })
    } else {
      res.status(200).json({ post })
    }
  })
  .catch(error => {
    res.status(500).json({ error: "The post's tags could not be retrieved." })
  })
})
//Add New Post
router.post('/', (req, res) => {
  const { userId, text } = req.body;
  if (!text || !userId) {
    res.status(400).json({ errorMessage: "Please provide a user ID and text for the post." })
    return;
  }
  postDb
  .insert({ userId, text })
  .then(post => {
    res.status(200).json({ post })
  })
  .catch(error => {
    res.status(500).json({ error: "There was an error while saving the post to the database" })
  })
})


//Update Post
router.put('/:id', (req, res) => {
  const { text } = req.body;
  const { id } = req.params;
  if(!text) {
    res.status(400).json({ error: "Please update the text for this post"});
  }
  postDb
  .update(id, { text })
  .then(post => {
    if(text === 0) {
      res.status(404).json({ error: "The post with the specified ID does not exist" })
      return;
    }
    res.status(200).json({ post })
  })
  .catch(error => {
    res.status(500).json({ error: "There was an error while updating the post to the database" })
  })
})

//Delete a Post
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  postDb
  .remove(id)
  .then(post => {
    if(!post) {
      res.status(404).json({ message: "The post with the specified ID does not exist." })
    } else {
      res.status(200).json({ post })
    }
  })
  .catch(error => {
    res.status(500).json({ error: "The post could not be removed" })
  })
})

module.exports = router;
