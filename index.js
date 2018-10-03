const express = require('express');

// middle ware pull-ins
const cors = require('cors'); // port-to-port interaction
const logger = require('morgan'); // http request logger
const helmet = require('helmet'); // encrypt res header...

// server helper functions
const userdb = require('./data/helpers/userDb');
const postdb = require('./data/helpers/postDb');

// init server
const server = express();

// middleware usage
server.use(express.json(), cors(), logger(':method :url :status :response-time ms'), helmet());

// route handlers

/* ======= USER ROUTES ======= */
server.get('/', (req, res) => {
  res.send(`
    <h1>Root Page</h1>
    <li><a href="http://localhost:${process.env.PORT}/users">All Users</a></li>
    <li><a href="http://localhost:${process.env.PORT}/posts">All Posts</a></li>
  `)
})

server.get( '/users', (req, res) => {
  userdb
    .get()
    .then(users => res.status(200).json(users))
    .catch(err => console.log(err));
});

server.get('/users/:id', (req, res) => {
  userdb
    .get(req.params.id)
    .then(user => res.status(200).send(user))
    .catch(err => res.status(500).send(err));
});

/* ======= POST ROUTES ======= */
server.get('/posts', (req, res) => {
  postdb
    .get()
    .then(posts => res.status(200).send(posts))
    .catch(err => res.status(500).send(err));
});

server.get('/posts/:id', (req, res) => {
  postdb
    .get(req.params.id)
    .then(post => res.status(200).send(post))
    .catch(err => res.status(500).send(err));
})

server.post('/posts', (req, res) => {
  const {text, userId} = req.body;
  const newPost = {text, userId};
  console.log(req.body);
  postdb
    .insert(newPost)
    .then(post => {
      postdb
        .get(post.id)
        .then(foundPost => res.status(200).send(foundPost))
        .catch(err => res.status(500).send(err));
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err)
    });
})

server.post('/users', (req, res) => {
  const {name} = req.body;
  const newUser = {name};
  userdb
    .insert(newUser)
    .then(user => {
      userdb
        .get(user.id)
        .then(foundUser => res.status(200).send(foundUser))
        .catch(err => res.status(500).send(err));
    })
    .catch(err => res.status(500).send(err));
})

// route handler listner
server.listen(process.env.PORT, () => console.log(`Port:${process.env.PORT}`));