const express = require('express');

//Import function model
const Posts = require('./postDb.js');

const router = express.Router();

//WORKING
router.get('/', (req, res) => {
    Posts.get(req.query)
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => {
        res.status(500).json({ message: "error retrieving posts"})
    })
});

//WORKING does not return error if ID is not found plz fix
router.get('/:id', (req, res) => {
    const id = req.params.id;
    Posts.getById(req.params.id)
    .then(users => {
      if (id) {
        res.status(200).json(users);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    })
    .catch(error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the user',
      });
    });
});

//WORKING
router.delete('/:id', validatePostId, (req, res) => {
    const id = req.params.id;
    Posts.remove(id)
    .then(post => {
        res.status(200).json(post);
    })
    .catch(err => {
        res.status(500).json({err: "error deleting post"})
    })
});

//WORKING
router.put('/:id', validatePostId, (req, res) => {
    const id = req.params.id;
    const editPost = req.body;

    Posts.update(id, editPost)
    .then(post => {
        res.status(200).json(post);
    })
    .catch(err => {
        res.status(500).json({err: "failed to update post"})
    })
});

// custom middleware

function validatePostId(req, res, next) {
    let post = req.params.id;

    Posts.getById(post)
    .then(posts => {
        if(posts){
            next();
        } else {
            res.status(400).json({ message: "not found"})
        }
    })
    .catch(err => {
        res.status(500).json({ err: "error"})
    })
};

module.exports = router;