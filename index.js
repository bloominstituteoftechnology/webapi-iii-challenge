const express = require('express');
const path = require('path');
const server = express();

const postDb = require('./data/helpers/postDb.js');

const userRoutes = require('./users/userRoutes.js');
const configMiddleware = require('./config/middleware.js');
configMiddleware(server);

server.use('/users/', userRoutes)

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


function allCapTheReq(req, res, next){
  console.log("custom", req.body.name)
  req.body.name = req.body.name.toUpperCase();
  console.log("custom", req.body.name)
  next();
}


server.post('/posts/', (req, res) => {
  //text is required
  //userId is required from existing user
  // if Id present say it will be disgarded
  postDb.insert(req.body)
    .then(postId => {
      res.status(200).json(postId)
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
