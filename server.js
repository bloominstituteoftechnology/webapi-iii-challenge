const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const usersdb = require('./data/helpers/userDb.js');

const server = express();

// middleware
const errorHandler = (number, defaultError) => {
    return res.status(number).json({ error: defaultError });
};

const validateUserName = (req, res, next) => {
  const userName = req.body.name;

  if (!userName) {
    return res.status(400).json({
      errorMessage: 'Please provide a name for the user.'
    });
  } else if (userName.length > 128) {
    return res.status(400).json({
      errorMessage: 'Name too long. Use up to 128 characters.'
    });
  } else if (userName[0] !== userName[0].toUpperCase()) {
    return res.status(400).json({
      errorMessage: 'First letter of name must be uppercase.'
    });
  } else {
    next();
  }
};

server.use(helmet());
server.use(express.json());
server.use(morgan('short'));
server.use(cors());

// routes

server.get('/', (req, res) => {
  res.send(`Server is running...`);
});

// server.get('/api/users', (req, res) => {
//   usersdb
//     .getUsers()
//     .then(users => {
//       res.status(200).json(users);
//     })
//     .catch(err => errorHandler(500, 'Could not obtain users'));
// });

server.get('/api/users', (req, res) => {
    usersdb
      .get()
      .then(users => {
        res.status(200).json(users);
      })
      .catch(err => res.status(500).json({ error: err }));
  });
  
  server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
  
    usersdb
      .get(id)
      .then(user => {
        if (!user) {
          // errorHandler(404, 'User not found');
          res.status(404).json({ error: 'User not found' });
        } else {
          res.status(200).json(user);
        }
      })
      .catch(err => res.status(500).json({ error: err }));
  });
  
  server.post('/api/users', validateUserName, (req, res) => {
    const { name } = req.body;
    const newUser = { name };
    usersdb
      .insert(newUser)
      .then(result => res.status(201).json(result))
      .catch(err => res.status(500).json({ error: err }));
  });
  
  server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
  
    usersdb
      .get(id)
      .then(user => {
        if (user) {
          usersdb.remove(id).then(count => {
            res.status(200).json(user);
          });
        } else {
          res
            .status(404)
            .json({ error: 'The user with the specific ID does not exist' });
        }
      })
      .catch(err => res.status(500).json({ error: err }));
  });
  
  server.put('/api/users/:id', validateUserName, (req, res) => {
    const id = req.params.id;
    const changes = req.body;
  
    usersdb
      .get(id)
      .then(user => {
        if (user) {
          usersdb
            .update(id, changes)
            .then(result => res.status(200).json(result))
            .catch(err => res.status(500).json({ error: err }));
        } else {
          res
            .status(404)
            .json({ error: 'The user with the specific ID does not exist' });
        }
      })
      .catch(err => res.status(500).json({ error: err }));
  });
  

// export(s)

module.exports = server;