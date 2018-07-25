const express = require('express');
const userDb = require('./data/helpers/userDb');
const postDb = require('./data/helpers/postDb');
const tagDb = require('./data/helpers/tagDb');

const server = express();

server.use(express.json());

server.get('/users', (req, res) => {
  userDb
    .get()
    .then(response => {
      res
        .status(200)
        .json(response)
        .end()
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: `The user information could not be retrieved.` })
        .end()
    })
})

server.get('/users/:id', (req, res) => {
  const id = req.params.id;
  userDb
    .get(id)
    .then(response => {
      res
        .status(200)
        .json(response)
        .end()
    })
    .catch(() => {
      res
        .status(404)
        .json({ error: `The specified User Id does not exist.` })
        .end();
    })
})

server.get('/posts', (req, res) => {
  postDb
    .get()
    .then(response => {
      res
        .status(200)
        .json(response)
        .end()
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: `The posts information could not be retrieved.` })
        .end()
    })
})

server.get('/posts/:id', (req, res) => {
  const id = req.params.id;
  postDb
    .get(id)
    .then(response => {
      res
        .status(200)
        .json(response)
        .end()
    })
    .catch(() => {
      res
        .status(404)
        .json({ error: `The specified Post Id does not exist.` })
        .end()
    })
})

server.get('/tags', (req, res) => {
  tagDb
    .get()
    .then(response => {
      res
        .status(200)
        .json(response)
        .end()
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: `The tags information could not be retrieved.` })
        .end()
    })
})

server.get('/tags/:id', (req, res) => {
  const id = req.params.id;
  tagDb
    .get(id)
    .then(response => {
      if(!response) {
        res
        .status(404)
        .json({ error: `The specified Tag ID does not exist.` })
        .end()
      }
      res
        .status(200)
        .json(response)
        .end()
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: `The tag information could not be retrieved.` })
        .end()
    })
})

server.get('/users/:id/posts', (req, res) => {
  const id = req.params.id;
  userDb
    .getUserPosts(id)
    .then(response => {
      res
        .status(200)
        .json(response)
        .end()
    })
    .catch(() => {
      res
        .status(404)
        .json({ error: `The specified User ID does not exist.` })
        .end()
    })
})

server.get('/posts/:id/tags', (req, res) => {
  const id = req.params.id;
  postDb
    .getPostTags(id)
    .then(response => {
      if(!response[0]) {
        res
        .status(404)
        .json({ error: `The specified Post ID either has no tags or does not exist.` })
        .end()
      }
      res
        .status(200)
        .json(response)
        .end()
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: `The tags information could not be retrieved.` })
        .end()
    })
})


server.listen(8000, () => console.log(`... API is running on port 8000 ...`));