
const express = require('express'); // CommonJS modules > module.exports = someCode;
const userdb = require('./data/helpers/userDb');
const postdb = require('./data/helpers/postDb.js');
const tagdb = require('./data/helpers/tagDB.js');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const server = express(); // creates the server

// Middle Ware
const yell = (req, res, next) => {
  req.body.name = req.body.name.toUpperCase();
  next();
}

server.use(express.json());
server.use(logger('combined'));
server.use(cors());
server.use(helmet());

server.get('/', (req, res) => {
  res.send('Is this working?')
})

// #################### GET #######################

// ******************** GET All USERS **********************
server.get('/users', (req, res) => {
  userdb.get()
  .then(users => {
    res.status(200).json(users)
  }).catch(() => {
    res.status(500).json({message: 'Internal Server Error'})
  });
})

// ******************** GET All POSTS **********************
server.get('/posts', (req, res) => {
  postdb.get()
  .then(posts => {
    res.status(200).json(posts)
  }).catch(() => {
    res.status(500).json({message: 'Internal Server Error'})
  });
})

// ******************** GET USER POSTS **********************
server.get('/users/:id', (req, res) => {
  userdb.getUserPosts(req.params.id)
    .then(userId => {
      userId === 0 || userId.length === 0 ?
      res.status(400).json({message:'Bad Request Error'})
      :
      res.status(200).json(userId)
    })
    .catch(() => {
      res.status(500).json({message: 'Internal Server Error'})
    });
})

// #################### POST #######################

// ******************** GET ADD USER **********************

server.post('/users',yell, (req, res) => {
  const { name } = req.body;
  !name ?
  res.status(400).json({message: 'Bad Request Error'}) : null
  userdb.insert({name})
  .then(userId => {
    res.status(200).json(userId)
  })
  .catch(() => {
    res.status(500).json({message: 'Internal Server Error'});
  });
});

// watch for traffic in a particular computer port
const port = 9000;
server.listen(port, () =>
  console.log(`\n=== API running on port ${port} ===\n`)
);