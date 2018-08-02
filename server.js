const express = require('express');
const server = express();

const posts = require('./data/helpers/postDb');
const tags = require('./data/helpers/tagDb');
const users = require('./data/helpers/userDb');

server.use(express.json());

server.get('/api/users', (req, res) => {
  users.get()
    .then(response => {
      res.json(response)
    })
    .catch(() => {
      res.status(500).json({ error: "The users information could not be retrieved." })
    })
});

server.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  users.get(id)
    .then(response => {
      if (response.length < 1) {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
      } else {
        res.json(response)
      }
    })
    .catch(() => {
      res.status(500).json({ error: "The user information could not be retrieved." })
    })
})


server.listen(5000, () => console.log('\n === API running on port 5000 === \n'));