const express = require('express');
const db = require('../data/helpers/userDb.js');


const configureMiddleware = require('./middleware.js');

const server = express();

// middleware
configureMiddleware(server);

const getAllUsers = (req, res) => {
  db.get()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json({ message: `Internal server error. Could not get users`, error });
    });
}

const getUser = (req, res) => {
  db.get(req.params.id)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      res.status(500).json({ message: `Internal server error. Could not get users`, error });
    });
}

const addUser = (req, res) => {
  db.insert({ name: req.body.name })
    .then(id => {
      res.status(201).json(id);
    })
    .catch(error => {
      res.status(500).json({ message: `Internal server error. Could not add user`, error });
    });
}

const deleteUser = (req, res) => {
  db.remove(req.params.id)
    .then(usersDeleted => {
      if (usersDeleted > 0) {
        res.status(200).json(usersDeleted);
      } else {
        res.status(400).json({ message: `User not deleted because they do not exist`, usersDeleted});
      }
    })
    .catch(error => {
      res.status(500).json({ message: `Internal server error. Could not delete user`, error });
    });

}

const updateUser = (req, res) => {
  if (req.body.name === undefined) {
    res.status(400).json({ errorMessage: "Please provide a name for a user." });
    return;
  }
  db.update(req.params.id, req.body)
    .then(usersUpdated => {
      if (usersUpdated > 0) {
        res.status(200).json({ message: `${usersUpdated} users updated`});
      } else {
        res.status(404).json({ message: 'error updating user', error})
      } 
    })
    .catch(error => {
      res.status(500).json({ message: `Internal server error. Could not update user`, error });
    });

}

const uppercaseName = (req, res, next) => {
  console.log('middleWareRan')
  if (req.body.name !== undefined) {
    process.stdout.write('name is not undefined\n')
    //console.log('name is not undefined');
    req.body.name = req.body.name.toUpperCase();
  }
  next()
}

const echo = (req, res) => {
  res.status(201).json({
    message: 'hey this endpoint work!',
    params: req.params,
    query: (req.query ? req.query : ''),
    body: req.body
  });
}
const userMW = [ uppercaseName ];

// endpoints

// bind user endpoints
server.get('/api/users', getAllUsers);
server.get('/api/users/:id', getUser);
server.post('/api/users', [uppercaseName, addUser]);
server.delete('/api/users/:id', deleteUser);
server.put('/api/users/:id', [uppercaseName, echo]);

server.get('/api/users/:id/posts', echo);

// bind post endpoints
server.get('/api/posts', echo);
server.get('/api/posts/:id', echo);
server.post('/api/posts', echo);
server.delete('/api/posts/:id', echo);
server.put('/api/posts/:id', echo);

module.exports = server;
