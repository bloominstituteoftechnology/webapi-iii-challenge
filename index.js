const express = require('express');
const userDb = require('./data/helpers/userDb');
const postDb = require('./data/helpers/postDb');
const tagDb = require('./data/helpers/tagDb');

const server = express();
server.use(express.json());

server.get('/api/users', (req, res) => {
  userDb.get()
    .then(response => {
      res.status(200).res.json(response);
    })
    .catch(err => {
      res.status(500)
        .json({ error: "The users information could not be retrieved"});
    });
})

server.get('/api/users/:id', (req, res) => {
  userDb.get(req.params.id)
    .then(response => {
      if (!response) {
        res.status(404)
          .json({ errorMessage: "The user with the specified ID does not exist" });
      }
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500)
        .json({ error: "The user information could not be retrieved"});
    });
});

server.post('/api/users',(req, res) => {
  if (!req.body.name) {
    res.status(400)
      .json({ errorMessage: "Please provide user name"});
    return;
  }
  userDb.insert(req.body)
    .then(response => {
      res.status(201).json(response);
    })
    .catch(err => {
      res.status(500)
        .json({ error: "There was an error saving user to the database"});
    });
});

server.listen(8000, () => console.log('API running on port 8000'));