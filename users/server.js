const express = require('express');
const bodyParser = require('body-parser');

const server = express();
const PORT = 3030;
const SERVER_SUCCESS = 200;

let users = [];
let counter = 0;

server.use(bodyParser.json());

server.post('/users', (req, res) => {
  const newUsername = req.body.user;
  const newUser = {
    id: counter,
    username: newUsername,
  };
  counter++;
  users.push(newUser);
  res.status(SERVER_SUCCESS);
  res.send(newUser);
});

server.get('/users', (req, res) => {
  res.status(SERVER_SUCCESS);
  res.send(users);
});

server.get('/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const user = users.filter(user => user.id === id)[0];
  res.status(SERVER_SUCCESS);
  res.send(user);
});

server.get('/search?name=<query>', (req, res) => {
  //Do a toLowerCase()
  const { name } = req.query;
  console.log('What is name?: ', name);
  const user = users.filter(user => user.name === name)[0];
  res.status(SERVER_SUCCESS);
  res.send(user);
});

server.delete('/users/:id', (req, res) => {
  const id = Number(req.params.id);
  users = users.filter(user => user.id !== id);
  res.status(SERVER_SUCCESS);
  res.send(users);
});

server.listen(PORT, err => {
  if (err) console.log(`There was an error starting the server: ${err}`);
  else console.log(`Server is listening on port ${PORT}`);
});
