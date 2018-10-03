const express = require('express'); // pull in express
const cors = require('cors');
const server = express(); // instantiate server
const logger = require('morgan');
const db = require('./data/helpers/userDb');

server.use(cors()); // connects react
server.use(express.json()); 

const port = 5201;

server.listen(port, () => {
  console.log(`================Running on port ${port}==============`);
});




server.get('/', (req, res) => {
  res.send('<h3>Welcome to INSTANT-GRAM!</h3>');
});

server.get('/users', (req, res) => {
  db.get()
    .then(users => {
      res.json(users)
    })
    .catch(err => res.send(err))
});

server.post('/users', (req, res) => {
  const { name } = req.body;
  const newUser = { name };

  db.insert(newUser)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => console.log(err));
});

server.delete('/users/:id', (req, res) => {
  const { id } = req.params;

  db.remove(id)
    .then(removedUser => {
      res.status(200).json(removedUser)
    })
    .catch(err => console.log(err));
  res.send(req.params);
});

server.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const newUser = { name };
  db.update(id, newUser)
    .then(user => {
      if (!id) {
        return res.status(404).send({ message: `The post with the specified ID does not exist.` })
      } else if (!name) {
        return res.status(400).send({ errorMessage: "Please provide a name." })
      }
      res.status(200).json(user);
    })
    .catch(err => console.log(err));
});