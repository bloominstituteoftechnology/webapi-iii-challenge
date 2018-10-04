const express = require('express');
const postRoute = express.Router();

const postDb = require('../data/helpers/postDb');
const validate = (req, res, next) => {
  if(!req.body.id) {
    next("u20");
  } else {
    next();
  }
}

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

postRoute.delete('/', validate, (req, res) => {
  const { id } = req.body
  postDb.remove(id)
    .then(response => {
      if(response) {
        res.status(200).json({ message: "Post delete success."})
      } else {
        res.status(400).json({ error: "Post does not exist." })
      }
    })
    .catch(err => console.log(err));
});

module.exports = postRoute;