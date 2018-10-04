const express = require('express');
const postRoute = express.Router();

const postDb = require('../data/helpers/postDb');

postRoute.get('/', (req, res) => {
  postDb.get()
    .then(response => res.status(200).json(response))
    .catch(err => res.status(400).json({ error: `Could not retrieve posts: ${err}`}));
});

postRoute.post('/', (req, res) => {
  const { text, userId } = req.body;
  const newPost = { userId, text }
  postDb.get(userId)
  .then(resp => {
    postDb.insert(newPost)
      .then(response => {
        res.status(201).json({
          ...response,
          ...newPost
        })
      })
      .catch(err => res.status(500).json({ error: `Server Error --> ${err}`}));
  })
  .catch(err => res.status(400).json({error: 'User does not exist.'}));
});

postRoute.delete('/', (req, res) => {
  console.log('posts')
});

module.exports = postRoute;