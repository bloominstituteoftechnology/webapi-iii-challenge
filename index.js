// node dependencies
const express = require('express');
const server = express();

// database
const userDb = require('./data/helpers/userDb');

server.use(express.json());

server.get('/', (req, res) => {
  res.send('Welcome!');
});

server.get('/api/users', (req, res) => {
  userDb.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ error: "The users information could not be retrieved.", err });
    })
});

const port = 5000;
server.listen(port, () =>
  console.log(`\n=== API running on port ${port} ===\n`)
);