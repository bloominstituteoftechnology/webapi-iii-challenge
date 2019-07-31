const express = require('express');

const router = express.Router();
const userDb = require('./userDb');
const postDb = require('../posts/postDb.js');

router.post('/', (req, res) => {
  const post = req.body;
  userDb
    .insert(post)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      res.status(500).json({
        error: err,
        message: 'There was an error while saving the post to the database'
      });
    });
});

router.post('/:id/posts', validatePost, async (req, res) => {
  const { id } = req.params;
  const newPost = { ...req.body, user_id: id };
  try {
    const post = await postDb.insert(newPost);
    res.status(200).json(post);
  } catch (err) {
    next({ message: 'missing required text field' });
  }
});

router.get('/', (req, res) => {});

router.get('/:id', (req, res) => {});

router.get('/:id/posts', (req, res) => {});

router.delete('/:id', (req, res) => {});

router.put('/:id', (req, res) => {});

//custom middleware

function validateUserId(req, res, next) {}

function validateUser(req, res, next) {}

function validatePost(req, res, next) {}

module.exports = router;
