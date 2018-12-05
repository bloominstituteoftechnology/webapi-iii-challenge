const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');

const userDb = require('./data/helpers/userDb');
const postDb = require('./data/helpers/postDb');

const server = express();
const PORT = 4040;

// middleware
server.use(express.json());
server.use(helmet());
server.use(logger('dev'));

server.get('/', (req, res) => {
  res.json({ message: 'server is running' });
});

// GET user by id
server.get('/user/:id', (req, res) => {
  const { id } = req.params;
  console.log(id);
  userDb
    .get(id)
    .then(user => {
      if (user) {
        res.send(user);
      } else {
        res.status(404).json({message: 'user does not exist'});
      }
    })
    .catch(err => {
      res.status(500)
      .json({ message: 'unable to fullfill request' });
    });
});

// GET post by userId
server.get('/posts/:userId', (req, res) => {
  const { userId } = req.params
    postDb
    .get(userId)
    .then(posts => {
      res.send(posts);
    })
    .catch(err => {
      res.status(500)
      .send({ message: 'unable retrieve posts.' });
    });
});

server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
