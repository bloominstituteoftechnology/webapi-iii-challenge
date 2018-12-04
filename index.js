//imports
const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');
const userDb = require('./data/helpers/userDb');
const postDb = require('./data/helpers/postDb');

const server = express();
const PORT = 3000;

//middleware
server.use(
  express.json(),
  logger('tiny'),
  helmet(),
);

//custom middleware

//requests

//retrieves a list of users
server.get('/api/users', (req, res) => {
  userDb.get()
    .then(users => {
      res.json(users)
    })
    .catch(err => {
      res.status(500).json({message: 'Could not find any users'})
    })
});

//retrieves a list of posts from a user
server.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  userDb.getUserPosts(id)
    .then(posts => {
      res.json(posts)
    })
    .catch(err => {
      res.status(500).json({message: `Couldn't retrieve posts`})
    })
});

//creates a post
server.post('/api/users', (req, res) => {
  const user = req.body;
  userDb.insert(user)
    .then(userId => {
      res.json(userId)
    })
    .catch(err => {
      res.status(500).json({message: `Couldn't add user`})
    })
})

server.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`)
});