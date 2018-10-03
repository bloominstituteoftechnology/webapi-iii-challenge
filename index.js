const express = require('express');
const server = express();
const port = 8000;

const db = require('./data/helpers/userDb.js');

server.use(express.json());

server.get('/', (req, res) => {
  res.send('Server test.');
});

// get users

server.get('/users', (req, res) => {
  db.get().then(users => {
    console.log('\n** users **', users);
    res.json(users);
  })
  .catch(err => console.error(err)); // adding specific messages later
});

// get user posts by specific ID

server.get('/users/:id', (req, res) => {
  const { id } = req.params;
  db.getUserPosts(id)
    .then(post => {
      console.log('\n** posts by specified user **', post);
      res.json(post);
  })
  .catch(err => console.error(err));
});

// add a user

server.post('/users', (req, res) => {
  const { id, name } = req.body;
  const newUser = { id, name };
  db.insert(newUser)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => console.error(err));
});

// delete a user

server.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(removeUser => {
      console.log(removedUser);
      res.status(200).json(removedUser);
    })
    .catch(err => console.error(err));
});

server.listen(port, () => console.log('Server listening on port 8000.'));
