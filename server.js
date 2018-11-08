

const express = require('express');

const server = express();

const upperCase = require('./middleware/upperCase.js');

const userDb = require('./data/helpers/userDb');

server.use(express.json());

server.get('/api/user/', (req, res) => {
  const { id } = req.params;
  userDb
    .get(id)
    .then( user => {
      res.status(200).json({user});
    })
    .catch( error => {
      res
        .status(500)
        .json({error: "Could not retrieve user info", error: error});
    });
  
});

server.get('/api/user/:id', (req, res) => {
  const { id } = req.params;

  userDb
    .get(id)
    .then(user => {
       res.status(200).json(user) 
    })
    .catch( error => {
      res.status(500).json({error: "Could not retrieve user info", error: error})
    })
})
server.get('/api/user/:id', (req, res) => {
  const { userId } = req.query.userId;
  userDb
    .getUserPosts(userId)
    .then(user => {
       res.status(200).json(user) 
    })
    .catch( error => {
      res.status(500).json({error: "Could not retrieve user info", error: error})
    })
})

server.post('/api/user', upperCase, (req, res) => {
  userDb 
    .insert(req.body)
    .then((userData) => {
      res.status(201).json(userData);
    })
    .catch(error => {
      res.status(500).json({ error: "Could not create post", error})
    })
})

server.put('/api/user/:id', upperCase, (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  userDb
    .update(id, changes)
    .then((user) => {
      user
      ? res.status(200).json({ message: 'User updated successfully' })
      : res.status(404).json({ message: 'That user was not found or already updated' });
  })
  .catch((error) => {
    res.status(500).json({ message: 'error updating user', error });
  });
});



  server.delete('/api/user/:id', (req, res) => {
    const { id } = req.params
    userDb
      .remove(id)
      .then(user => {
        user
          ? res.status(200).json(count) 
          : res.status(404).json({ message: "The user with the specified ID does not exist."})
      })
      .catch( error => {
        res.status(500).json({ error: "The user could not be removed", error })
      })
  })

module.exports = server;