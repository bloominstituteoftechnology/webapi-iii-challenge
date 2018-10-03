const express = require('express');
const server = express();
const port = 8000;

const db = require('./data/helpers/userDb.js');

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
  db.getUserPosts(id).then(post => {
    console.log('\n** posts by specified user **', post);
    res.json(post);
  })
  .catch(err => console.error(err));
});


server.listen(port, () => console.log('Server listening on port 8000.'));
