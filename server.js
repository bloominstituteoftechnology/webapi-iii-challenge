const express = require('express');
const bodyParser = require('body-parser');

const server = express();
const PORT = 3030;

server.listen(PORT, err => {
  if (err) console.log(`Error is ${err}`);
  else console.log(`Listening on port: ${PORT}`);
});

idCounter = 3;
const users = {
  1: 'Bob',
  2: 'Bob2',
  3: 'Bob3',
};

server.use(bodyParser.json());

server.get('/users', (req, res) => {
  res.status(200);
  res.send(users);
});

server.get('/users/:id', (req, res) => {
  const { id } = req.params;
  res.status(200);
  res.send({ id: users[id] });
});

server.get('/search', (req, res) => {
  if (req.query.name) {
    let user = null;
    let result = [];
    Object.keys(users).forEach(id => {
      if (users[id].toLowerCase() === req.query.name.toLowerCase()) {
        result.push(users[id]);
      }
    });
    res.status(200);
    res.send(result);
  } else {
    res.status(200);
    res.send(users);
  }
});

server.post('/', (req, res) => {
  const user = req.body;

  idCounter++;
  users[idCounter] = user;
  res.status(200);
  res.send({ id: idCounter });
});

server.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  delete users[id];
  res.status(200);
  res.send(users);
});
