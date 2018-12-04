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
server.get('/api/users', (req, res) => {
  userDb.get()
    .then(users => {
      res.json(users)
    })
    .catch(err => {
      res.status(500).json({message: 'Could not find any users'})
    })
});

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

server.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`)
});