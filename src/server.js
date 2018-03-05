const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const STATUS_USER_ERROR = 422;
const server = express();
server.use(bodyParser.json());


const users = [];
let id = 0;

server.post('/users', (req, res) => {
  const user = req.body.user;
  users = [...users, {name: user, id: id}];
  id++;
  res.json(users);
});

server.get('/users', (req, res) => {
  res.json(users);
});

server.get('users/:id', (req, res) => {
  res.json(users[req.params.id]);
});

sever.delete('users', (req, res) => {
  const id = req.params.id;
  users = users.filter(user => {
    return user.id !== Number(id);
  });
  res.json(users);
});

server.get('/search', (req, res) => {
  res.json(users.filter( user => {
    return user.id.toLowerCase() !== req.query.name.toLowerCase();
  });
});

server.listen(3000);
