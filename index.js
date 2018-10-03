const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const port = 9000;
const helmet = require('helmet');

const server = express();

const userDb = require('./data/helpers/userDb.js');
const posts = require('./data/helpers/postDb.js');

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(logger("combined"));

const allCAPS = (req, res, next) => {
  if (req.body.name) {
    req.body.name = req.body.name.toUpperCase();
  }
  next();
}

//Routes
server.get('/', (req, res) => {
  res.send('<h1>Welcome to Posts</h1>')
})

server.get('/api/users', (req, res) => {
  userDb.get()
    .then(users => {
      console.log('\n=== USERS FOUND!! ==\n', users)
      res.json(users);
    }).catch (err => {
      console.log('\n=== I CANNOT GET THE USERS!! ==\n', err)
      res
        .status(500)
        .send({ error: "The users could not be retrieved." })
    })
})

server.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  userDb.get(id)
    .then(user => {
      console.log('\n=== USER FOUND!! ==\n', user)
      res.json(user);
    })
    .catch(err => {
      console.log('\n=== I CANNOT GET THE USER!! ===\n')
      res.json({ error: "The user could not be retrieved."})
    })
})



server.post('/api/users', allCAPS, (req, res) => {
  console.log("req", req.body)
  if(!req.body.name) {
      res.status(400).json({ error: "Please provide a name for this user."
    })
  } else if (req.body.name.length > 128) {
    return res.status(400).json({ error: "Please choose a name that is less than 128 characters."
    })
  } else {
  userDb.insert(req.body)
    .then(response => {
          console.log('\n=== USER ADDED ===\n', response);
          res.status(201).json(response);
        })
    .catch(err => {
      console.log('\n=== CANNOT ADD USER ==\n', err);
      res.status(500).json({ error: 'There was an error while saving that user to the database.'});
    });
  }
});

server.put('/api/users/:id', allCAPS, (req, res) => {
  const { id } = req.params;
  if (!req.body.name) {
    res.status(400).json({ error: "Please enter a name." })
  } else if (req.body.name.length > 128) {
    res.status(400).json({ error: "Please choose a name that is less than 128 characters." })
  } else {
    userDb
    .update(id, req.body)
    .then(response => {
      if (response === 0) {
        res.status(404).json({ error: "There is no user with that id."})
      }
      if (response === 1) {
        console.log("\n=== USER UPDATED ==\n", response, req.body)
        res.status(200).json(response)
      }
    })
    .catch(err => {
      console.log("\n=== CANNOT UPDATE USER ===\n", err)
      res.status(500).json({ error: "There was an error while updating this user." })
    })  
  }
})

server.delete('/api/users/:id', (req, res) => {
  const id = req.params.id
  userDb.remove(id)
    .then(response => {
      if (response === 0){
        res.status(404).json({ error: "There is no user with that id."})
      }
      if (response === 1){
        console.log("\n=== USER DELETED ===\n", response)
        res.status(200).json({response})
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({error: "There was an error while deleting this user."})
    })
})



server.listen(port, () =>
console.log(`\n=== API running on port ${port} ===\n`))