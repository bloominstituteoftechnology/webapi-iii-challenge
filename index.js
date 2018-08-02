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
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500)
        .json({ error: "The user information could not be retrieved"});
    });
});

server.listen(8000, () => console.log('API running on port 8000'));