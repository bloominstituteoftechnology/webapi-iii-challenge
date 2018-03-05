const express = require('express');
const bodyParser = require('body-parser');

const server = express();
const PORT = 3030;

let idCounter = 5;
const users = {
  1: 'Joe',
  2: 'John',
  3: 'Jerry',
  4: 'Joe',
  5: 'Joe',
};

let results = [];

server.get('/users', (req, res) => {
  res.status(200);
  res.send(users);
});

server.get('/users/:id/', (req, res) => {
  const id = req.params.id;
  res.status(200);
  res.send(users[id]);
});

server.get('/search', (req, res) => {
  if (req.query.name) {
    let user = null;
    Object.keys(users).forEach(id => {
      if (users[id] === req.query.name) {
        results.push(user[id]);
      }
    });
    res.status(200);
    res.send(results);
  } else {
    res.status(200);
    res.send(users);
  }
});

server.post('/users', (req, res) => {
  const user = req.body.user;
  if (!user) {
    res.status(402);
    return;
  }

  idCounter++;
  users[idCounter] = user;
  res.status(200);
  res.send({ id: idCounter });
});

server.listen(PORT, err => {
  if (err) {
    console.log(`ERROR! ${err}`);
  } else {
    console.log(`SERVER! ${PORT}`);
  }
});
