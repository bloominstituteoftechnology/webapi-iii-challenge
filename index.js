// node dependencies
const express = require('express');
const server = express();

// database
const userDb = require('./data/helpers/userDb');

// middleware
server.use(express.json());

// custom middleware user's name is Uppercased
const upperCase = (req, res, next) => {
  req.body.name = req.body.name.toUpperCase();
  next();
};

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

server.get('/api/users/:userId', (req, res) => {
  const userId = req.params.userId;
  userDb.get(userId)
    .then(user => {
      if (!user) {
        res.status(404).json({ message: "The user with the specified ID does not exist." });
      }
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({ error: "The user information could not be retrieved.", err });
    });
});

server.post('/api/users', upperCase, (req, res) => {
  const { name } = req.body;
  const newUser = { name };
  userDb
    .insert(newUser)
    .then(userId => {
      const { id } = userId;
      userDb.get(id)
        .then(user => {
          if (!user) {
            res.status(400).json({ errorMessage: "Please provide name for the user." });
          }
          res.status(201).json(user);
        });
    })
    .catch(err => {
      res.status(500).json({ error: "There was an error while saving the user to the database", err });
    })
});

const port = 5000;
server.listen(port, () =>
  console.log(`\n=== API running on port ${port} ===\n`)
);