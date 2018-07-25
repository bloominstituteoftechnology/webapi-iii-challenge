const express = require('express');
const server = express();
const postDb = require('./data/helpers/postDb.js');
const tagDb = require('./data/helpers/tagDb.js');
const userDb = require('./data/helpers/userDb.js');

server.use(express.json());

server.get('/users', (req, res) => {
  userDb
  .get()
  .then(users => {
    res.status(200).json({ users });
  })
  .catch(error => {
    res.status(500).json({ error: "Could not retreive users"})
  })
})

server.get('/users/:id', (req, res) => {
  const { id } = req.params;
  userDb
  .getUserPosts(id)
  .then(user => {
    if (user.length === 0) {
      res.status(404).json({ message: "The user with the specified ID does not exist." })
    } else {
      res.status(200).json({ user })
    }
  })
  .catch(error => {
    res.status(500).json({ error: "The user information could not be retrieved." })
  })
})

server.get('/posts', (req, res) => {
  postDb
  .get()
  .then(posts => {
    res.status(200).json({ posts });
  })
  .catch(error => {
    res.status(500).json({ error: "Could not retreive posts"})
  })
})

server.get('/posts/:id', (req, res) => {
  const { id } = req.params;
  userDb
  .getUserPosts(id)
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

server.get('/posts/:id/tags', (req, res) => {
  const { id } = req.params;
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




server.listen(8000, () => console.log('API running on port 8000'));
