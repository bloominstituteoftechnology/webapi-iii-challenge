const express = require('express');

// middle ware pull-ins
const cors = require('cors'); // port-to-port interaction
const logger = require('morgan'); // logger of things...
const helmet = require('helmet'); // encrypt res header...

// server helper functions
const userdb = require('./data/helpers/userDb');
const postdb = require('./data/helpers/postDb');

// init server
const server = express();

// middleware usage
server.use(express.json(), cors(), logger('combined'), helmet());

// route handlers

/* ======= USER ROUTES ======= */
server.get('/', (req, res) => {
  res.send(`
    <h1>Root Page</h1>
    <a href="http://localhost:${process.env.PORT}/users"/users>All Users</a>
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

// route handler listner
server.listen(process.env.PORT, () => console.log(`Port:${process.env.PORT}`));