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
  const query = req.query.name;
  const usersArr = Object.values(users).map(user => {
    return user.toLowerCase();
  });

  res.json(
    usersArr.includes(query.toLowerCase())
      ? Object.values(users).filter(
          user => user.toLowerCase() === query.toLowerCase(),
        )
      : `No user found with name: ${query}`,
  );

  // search with user includes characters
  //
  // res.json(
  //   usersArr.join('').includes(query.toLowerCase())
  //     ? Object.values(users).filter(user =>
  //         user.toLowerCase().includes(query.toLowerCase()),
  //       )
  //     : `No users found with name: ${query}`,
  // );
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
