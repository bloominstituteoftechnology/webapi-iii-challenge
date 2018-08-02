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
});

server.post('/api/users', (req, res) => {
  const { name } = req.body;
  if ( { name } === null ) {
    res.status(400).json({ errorMessage: "Please provide name for the user." })
  } else {
      users.insert({ name })
      .then(response => {
        res.status(201).json(response)
      })
      .catch(() => {
        res.status(500).json({ error: "There was an error while saving the user to the database." })
      })
  }
});

server.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  users.remove(id)
    .then(response => {
      if (response > 0) {
        res.status(200).json(response)
      } else {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
      }
    })
    .catch(() => {
      res.status(500).json({ error: "The user could not be removed."})
    })
});

server.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  if ( { name } === null ) {
    res.status(400).json({ errorMessage: "Please provide name for the user."})
  } else {
    users.get(id)
      .then(response => {
        if (response.length < 1) {
          res.status(404).json({ message: "The user with the specified ID does not exist."})
        } else {
          users.update(id, { name })
            .then((name) => {
              res.status(200).json(name);
            })
        }
      })
      .catch(() => {
        res.status(500).json({ error: "The user information could not be modified."})
      })
  }
});



server.listen(5000, () => console.log('\n === API running on port 5000 === \n'));