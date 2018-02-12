const express = require('express');
const bodyParser = require('body-parser');

const server = express();
const PORT = 3031;

server.use(bodyParser.json());

const users = {};
let nextId = 0;

server.get('/', (req, res) => {
  res.send('<h1>home</h1>');
});

server.get('/search', (req, res) => {
  const query = req.query.name.toLowerCase();

  res.json(
    Object.values(users).includes(query).length > 0
      ? Object.values(users).includes(query)
      : `No users found with name: ${query}`,
  );
});

server.get('/users', (req, res) => {
  res.json(Object.values(users));
});

server.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  if (!Object.keys(users).includes(userId)) res.send('ID not found.');
  res.json(users[userId]);
});

server.post('/users', (req, res) => {
  users[nextId++] = req.body.user;
  res.json(Object.values(users));
});

server.listen(PORT, err => {
  if (err) console.log(`There was an error starting the server: ${err}`);
  else console.log(`Server listening on port ${PORT}`);
});
