const express = require('express');

const server = express();

const postDb = require('./data/helpers/postDb.js');
const userDb = require('./data/helpers/userDb.js');

server.use(express.json());

server.get('/posts', (req, res) => {
  console.log('posts requested')
  postDb.get().then(allPosts => {
    res.status(200).json(allPosts)
  })
});

server.get('/posts/:id', (req, res) => {
  console.log('id requested')
  postDb.get(req.params.id).then(post => {
    res.status(200).json(post)
  })
});

server.get('/users', (req, res) => {
  console.log('users requested')
  userDb.get().then(allUsers => {
    res.status(200).json(allUsers)
  })
});

server.get('/users/:id', (req, res) => {
  console.log('user id requested')
  userDb.get(req.params.id).then(user => {
    res.status(200).json(user)
  })
});

server.post('/users/', (req, res) => {
  userDb.insert(req.body)
  .then( newUserId => {
    res.status(201).json(newUserId)
  })
  .catch(err => {
    res.status(400).json(err)
  })
});

server.post('/posts/', (req, res) => {
  console.log('new post requested', req.body)
  postDb.insert(req.body)
    .then(postId => {
      res.status(200).json(postId)
    })
    .catch(err => {
      res.status(400).json(err)
    })
});

server.put('/users/:id', (req, res) => {
  console.log('update user', req.params.id, req.body)
  userDb.update(req.params.id, req.body)
  .then( count => {
    res.status(201).json(count)
  })
  .catch(err => {
    res.status(400).json(err)
  })
});

server.put('/posts/:id', (req, res) => {
  console.log('update post')
  postDb.update(req.params.id, req.body)
  .then(count => {
    res.status(201).json(count)
  })
  .catch(err => {
    res.status(400).json(err)
  })
});

server.delete('/users/:id', (req, res) => {
  console.log('remove user')
  userDb.remove(req.params.id)
  .then( newUserId => {
    res.status(201).json(newUserId)
  })
  .catch(err => {
    res.status(400).json(err)
  })
});

server.delete('/posts/:id', (req, res) => {
  console.log('remove post')
  postDb.remove(req.params.id)
  .then( newUserId => {
    res.status(201).json(newUserId)
  })
  .catch(err => {
    res.status(400).json(err)
  })
});

server.listen(5000, () => console.log('server running on 5k'))
