const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');

const userDB = require('./data/helpers/userDb');
// console.log(userDB);

const postDB = require('./data/helpers/postDb');
// console.log(postDB);

const server = express();
const port = 5050;

// ================= CUSTOM MIDDLEWARE =================
const upperCaseName = (req, res, next) => {
  //===== CHECK IF THE FIRST LETTER OF THE NAME IS CAPITALIZED =====
  //   if (req.method === 'POST' || req.method === 'PUT') {
  //     const { name } = req.body;
  //     if (name[0] === name[0].toUpperCase()) {
  //       next();
  //     } else {
  //       res.status(400).json({ message: 'Name must be capitalized' });
  //     }
  //   } else {
  //     next();
  //   }
  //===== TRANSFORM THE NAME TO BE ALL UPPERCASE AND SEND IT THROUGH =====
  if (req.method === 'POST' || req.method === 'PUT') {
    req.body.name = req.body.name.toUpperCase();
    next();
  } else {
    next();
  }
};

// Middleware
server.use(express.json());
server.use(logger('dev'));
server.use(helmet());
server.use(upperCaseName);

// Endpoints

// GET
server.get('/users', (req, res) => {
  userDB
    .get()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json({ error: 'Error getting user' });
    });
});

server.get('/users/:id', (req, res) => {
  const { id } = req.params;
  userDB
    .get(id)
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        res
          .status(404)
          .json({ message: 'User with specified ID is not found' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'Could not get user' });
    });
});

// POST
server.post('/users', (req, res) => {
  const user = req.body;
  if (user.name) {
    userDB
      .insert(user)
      .then(user => {
        res.json(user);
      })
      .catch(err => {
        res.status(500).json({ error: 'Could not add user' });
      });
  } else {
    res.status(400).json({ message: 'Please make sure a name is entered' });
  }
});

// DELETE
server.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  userDB
    .remove(id)
    .then(count => {
      if (count) {
        res.json({
          message: `User with the ID of ${id} has been deleted successfully`
        });
      } else {
        res
          .status(404)
          .json({ error: 'user with specified ID does not exist' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'Could not delete' });
    });
});

// PUT
server.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const user = req.body;
  if (user.name) {
    userDB
      .update(id, user)
      .then(count => {
        if (count) {
          userDB.get(id).then(user => {
            res.json(user);
          });
        } else {
          res
            .status(404)
            .json({ message: `User with an ID of ${id} does not exist` });
        }
      })
      .catch(err => {
        res.status(500).json({ error: 'The user data could not be found' });
      });
  } else {
    res.status(400).json({ message: 'Please provide a name' });
  }
});

// LISTENING
server.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
