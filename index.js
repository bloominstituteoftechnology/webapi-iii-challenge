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

//Add DELETE ROUTE to delete a user
server.delete("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await users.remove(id);
    if (user === 0) {
      return res.status(404).json({ message: "The user with the specified ID does not exist." });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "The user could not be removed" });
  }
});

//Add PUT ROUTE to update a user's information...which right now is name
server.put('/api/users/:id', async (req, res) => {
  if (!req.body.name) {
    return res.status(400).send({ errorMessage: "Please provide name for the user." });
   } try {
    await users.update(req.params.id, req.body);
    try {
    const user = await users.get(req.params.id);
    if (user.length === 0) {
      return res.status(404).send({ message: "The user with the specified ID does not exist." });
    } else {
      return res.status(200).json(user);
    }
   } catch (error) {
      return res.status(500).send({ error: "The user information could not be modified." });
   }
  } catch (error) {
    return res.status(500).send({ error: "The user information could not be modified." });
 }
});

// call server.listen w/ a port of 8250
server.listen(port, () =>
  console.log(`\n=== API running on port ${port} ===\n`)
);