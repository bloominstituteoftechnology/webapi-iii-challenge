const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const userDb = require('../data/helpers/userDb');
const postDb = require('../data/helpers/postDb');
const tagDb = require('../data/helpers/tagDb');

const server = express();



// configure middleware
server.use(express.json());
server.use(helmet());
server.use(morgan('short'));


// add custom middleware
// function toUpperCaseMiddleware


// configure endpoints

// get /users
server.get('/users', (req, res) => {
  userDb.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => { 
      res
        .status(500)
        .json(err);
    });
});

// get /users/:id
server.get('/users/:userId', (req, res) => {
  const { userId } = req.params;

  userDb.get(userId)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => {
      res
        .status(500)
        .json(err);
    })
})

// get /users/:id/posts
server.get('/users/:userId/posts', (req, res) => {
  const { userId } = req.params;

  userDb.getUserPosts(userId)
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(err => {
      res
        .status(500)
        .json(err);
    })
})

// get /users/:userId/posts/:postId
server.get('/posts/:postId', (req, res) => {
  const { postId } = req.params;

  postDb.get(postId)
    .then(post => {
      res.status(200).json(post)
    })
    .catch(err => {
      res
        .status(500)
        .json(err);
    })
})


// get /posts
server.get('/posts', (req, res) => {
  postDb.get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => { 
      res
        .status(500)
        .json(err);
    });
});



module.exports = server;