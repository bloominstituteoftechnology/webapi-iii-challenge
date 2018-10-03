// IMPORTS
const express = require('express');
const userDb = require('./data/helpers/userDb.js');
const postDb = require('./data/helpers/postDb.js');
const port = 8000;

// SETUP
const server = express();
server.use(express.json());

// MIDDLEWARE
const upperCaser = (req, res, next) => {
  req.name = req.body.name.toUpperCase();
  next();
}

server.route('/users')
  .get((req, res) => {
    userDb.get()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json({ error: "The request for users could not be retrieved." }));
  })
  .post(upperCaser, (req, res) => {
    const { name } = req;
    const newUser = {};
    newUser.name = name;
    console.log(newUser);
      if (!name) return res.status(400).json({ errorMessage: "Please provide a user name." });
      userDb.insert(newUser)
        .then(user => res.status(201).json(user))
        .catch(err => res.status(500).json({ error: "There was an error while saving the post to the database" }));
  })

// POSTS ROUTE HANDLERS
server.route('/posts')
  .get((req, res) => {
    postDb.get()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json({ error: "The request for posts could not be retrieved." }));
  })

// PORT LISTENERS
server.listen(port, () => console.log(`===${port} is online!===`))