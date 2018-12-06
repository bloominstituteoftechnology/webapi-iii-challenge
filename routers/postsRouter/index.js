const express = require('express');
const postDB = require('../../data/helpers/postDb');

const router = express.Router();

// ----------- SETUP POSTS END POINTS ----------------

// ~~~~~~~~~~~ GET REQUEST POSTS ~~~~~~~~~~~~~~~~~~~~
router.get('/', (req, res) => {
  postDB.get()
        .then(posts => {
          if(posts) {
            res.json({posts: posts})
          }
          else {
            res.status(404).json({error: "Cannot access posts at this time, try again later."})
          }
        })
        .catch(err => {
          res.status(500).json({error: "Database down, come back later"})
        })
})

// ~~~~~~~~~~~ GET REQUEST FOR POST (ID) ~~~~~~~~~~~~~~~~~~~~
router.get('/:id', (req,res) => {
  const { id } = req.params;

  postDB.get(id)
        .then(post => {
          if(post) {
            res.json({post: post})
          }
          else {
            res.status(500).json({error: "The database is down, come back later"})
          }
        })
        .catch(err => {
          res.status(404).json({error: "This post does not exist"})
        })
})

// ~~~~~~~~~~~ POST REQUEST FOR NEW POST ~~~~~~~~~~~~~~~~~~~~
router.post('/', (req, res) => {
  const { userId, text } = req.body;
  const newPost = {text, userId };

  postDB.insert(newPost)
        .then(postID => {
          if(postID) {
            res.status(201).json({post: {...newPost}})
          }
          else {
            res.status(500).json({error: "Could not create new post, try again later"})
          }
        })
        .catch(err => {
          res.status(404).json({error: err})
        })
})

// ~~~~~~~~~~~ DELETE REQUEST FOR POST ~~~~~~~~~~~~~~~~~~~~
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  postDB.remove(id)
        .then(deleted => {
          if(deleted) {
            res.json({message: 'Post successfully deleted.'})
          }
        })
        .catch(err => {
          res.status(500).json({error: err})
        })
})

// ~~~~~~~~~~~ UPDATE REQUEST FOR POST ~~~~~~~~~~~~~~~~~~~~
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  postDB.update(id, {text})
        .then(count => {
          if (count) {
            res.json({message: "Post has been successfully updated."})
          }
          else {
            res.status(400).json({message: "Please refresh and try again."})
          }
        })
        .catch(err => {
          res.status(500).json({error: "router not responding, please try again"})
        })
})

module.exports = router;
