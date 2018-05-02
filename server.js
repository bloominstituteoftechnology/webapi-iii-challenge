//importing express
const express = require('express');
const server = express();
const postDb = require('./data/helpers/postDb');
const tagDb = require('./data/helpers/tagDb');
const userDb = require('./data/helpers/userDb');

//add middleware
server.use(express.json());


//---------------------------posts
// get
server.get('/api/posts', (req, res) => {
    postDb.get()
    .then(r => res.status(200).json({r}))
    .catch(err => res.status(500).json({Error: err}));

})
// post
server.post('/api/posts', (req, res) => {
  const postInfo = req.body;
  postDb.insert(postInfo)
  .then(r => res.status(200).json(postInfo))
  .catch(err => res.status(500).json({Error: err}));
})
// delete


//---------------------------tags
// get
server.get('/api/tags', (req, res) => {
  tagDb.get()
  .then(r => res.status(200).json({r}))
  .catch(err => res.status(500).json({Error: err}));
})
// post
server.post('/api/tags', (req, res) => {
  const tagsInfo = req.body;
  tagDb.insert(tagsInfo)
  .then(r => res.status(200).json(tagsInfo))
  .catch(err => res.status(500).json({Error: err}));
})
//delete


//---------------------------users
// get
server.get('/api/users', (req, res) => {
  userDb.get()
  .then(r => res.status(200).json({r}))
  .catch(err =>res.status(500).json({Error: err}));

})

// post
server.post('/api/users', (req, res) => {
  const userInfo = req.body;
  userDb.insert(userInfo)
  .then(r => res.status(201).json(userInfo))
  .catch(err => res.status(500).json({Error: err}));
})





//server attached to a port
const port = 5000;
server.listen(port, () => console.log('== Server is listening on port 5000 =='));
