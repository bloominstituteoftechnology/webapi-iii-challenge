const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');

const userDB = require('./data/helpers/userDb');
const postDB = require('./data/helpers/postDB');
const tagDB = require('./data/helpers/tagDB');

const server = express();
const port = 4500;

server.use(express.json());
server.use(logger('dev'));
server.use(helmet());

//user endpoints

server.get('/user', (req, res) => {
    userDB
      .get()
      .then(users => {
        res.json(users);
      })
      .catch(err => {
        res.status(500).json({ error: 'Error getting user' });
      });
  });
  
  server.get('/user/:id', (req, res) => {
    const { id } = req.params;
    userDB
      .get(id)
      .then(user => {
        if (user) {
          res.json(user);
        } else {
          res
            .status(404)
            .json({ message: 'User with specified ID is not found' });
        }
      })
      .catch(err => {
        res.status(500).json({ error: 'Could not get user' });
      });
  });
  

//server listening

server.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
});