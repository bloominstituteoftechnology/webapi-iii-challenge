// import node modules
const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const helmet = require('helmet');

// users data
const users = require('./data/helpers/userDb.js');

// Name port
const port = 8250;

//instanciate your server
const server = express();// creates the server

// add GLOBAL MIDDLEWARE
server.use(express.json());// formatting our req.body obj
server.use(cors());// this neeeded to connect from react
server.use(logger ('combined'));// combined or tiny
server.use(helmet());

//ROUTES

//Add home route
server.get('/', (req, res) => {
  res.send('You are HOME!');
});

// Add GET ROUTE to access the users
server.get('/api/users', (req, res) => {
  users.get()
    .then( allUsers => {
      console.log('\n** all users **', allUsers);
      res.status(200).json(allUsers);
    })
    .catch(err => res.status(500).send({ error: "All users information could not be retrieved." }));
});

//Add POST ROUTE to add a user
server.post('/api/users', (req, res) => {
  if(!req.body.name) {
   return res.status(400).send({ errorMessage: "Please provide name for user." });
  }
  if(req.body.name) {
    const { name } = req.body;
  const newUser = { name };
  users.insert(newUser)
        .then(newUser => {
        console.log(newUser);
        res.status(201).json(newUser);
      })
    .catch(err => res.status(500).send({ error: "There was an error while saving the user to the database" }));

  }});

// call server.listen w/ a port of 8250
server.listen(port, () =>
  console.log(`\n=== API running on port ${port} ===\n`)
);