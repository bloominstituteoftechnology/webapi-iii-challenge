//node modules
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const port = 5000;
const portDb = require('./data/helpers/postDb');
// const tagDb = require('./data/helpers/tagDb');
const userDb = require('./data/helpers/userDb');
const server = express();

//middlewares


//server code
server.use(express.json());
server.use(logger('tiny'), cors(), helmet());

//Route
server.get('/', (req, res) => {
  res.json('Hi');
});

server.get('/api/users', (req, res) => {
  userDb.get()
    .then(users => {
      console.log('\n** users **', users);
      res.json(users);
    })
    .catch(err => res.json({Error: 'Error getting users.'}));
})

server.post('/api/users', (req, res) => {
 //console.log(req.body); 
  const { name } = req.body;
  const newUser = { name }
  userDb.insert(newUser)
    .then(user => {
      console.log('\n--- New user added ---\n, user');
      res.status(201).json(user);
    })
    .catch(err => res.json({ Error: 'Error adding a new user.'}));
})

server.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const editUser = { name }
  userDb.update(id, editUser)
    .then(user => {
      console.log('\n--- User edited ---\n, user');
      res.status(200).json(user);
    })
    .catch(err => res.json({Error: 'Error editting user.'}));
})

server.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  userDb.remove(id)
    .then(removedUser => {
      console.log('\n--- User removed ---\n, removedUser');
      res.status(200).json(removedUser);
    })
    .catch(err => res.json({Error: 'Error removing user.'}));
})


//port
server.listen(port, () => {
  console.log(`\n--- Server running on port ${port} ---\n`)
})