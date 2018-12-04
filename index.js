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
      res
        .status(500)
        .json({error: `Couldn't retrieve posts`})
    })
});

//creates a user
server.post('/api/users', (req, res) => {
  const user = req.body;

  if (user.name) {
    userDb.insert(user)
      .then(userId => {
        res.json(userId)
      })
      .catch(err => {
        res
          .status(500)
          .json({error: `Couldn't add user`})
      })
  } else {
    res
      .status(400)
      .json({errorMessage: 'Please include a username'})
  }
});

//deletes a user
server.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;

  userDb.remove(id)
    .then(count => {
      if (count) {
        res
          .json({message: 'Successfully deleted'})
      } else {
        res
          .status(404)
          .json({message: 'The user with the specified ID does not exist'})
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({error: 'User could not be removed'})
    })
});

//updates a user
server.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const user = req.body;

  if (user.name) {
    userDb.update(id, user)
      .then(count => {
        if (count) {
          res.json({message: 'Successfully updated'})
        } else {
          res
            .status(404)
            .json({message: 'The user with the specified ID does not exist'})
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({error: 'User could not updated'})
      })
  } else {
    res
      .status(400)
      .json({errorMessage: 'Please provide a username to update'})
  }
})

server.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`)
});