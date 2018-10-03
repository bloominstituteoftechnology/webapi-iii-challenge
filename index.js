const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const port = 9000;
const userDb = require('./data/helpers/userDb');
const postDb = require('./data/helpers/postDb');

const server = express();

///////////////
// Middlewares
///////////////
const capitalize = (req, res, next) => {
  next();
};

server.use(logger('combined'));
server.use(express.json());

///////////////
// Routes
///////////////

// ####### Users #######
server.get('/api/users', (req, res) => {
  userDb
    .get()
    .then((users) => {
      console.log('** users **\n', users);
      res.status(200).json(users);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ error: 'The users information could not be retrieved.' });
    });
});

server.post('/api/users', (req, res) => {
  // console.log('req.body', req.body);
  const { name } = req.body;
  if (!name) {
    return res.status(400).send({
      errorMessage: 'Please provide a name for the user.',
    });
  }
  const newUser = { name };
  userDb.insert(newUser).then((userId) => {
    // console.log(userId);
    const { id } = userId;
    userDb
      .get(id)
      .then((user) => {
        // console.log(user);
        if (!user) {
          return res
            .status(422)
            .send({ Error: `User does not exist by id ${userId}` });
        }
        res.status(201).json(user);
      })
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .json({ error: 'The users information could not be saved.' });
      });
  });
});

server.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  userDb
    .remove(id)
    .then((remove) => {
      console.log(remove);
      if (!remove) {
        return res.status(404).send({
          message: 'The user with the specified ID does not exist.',
        });
      }
      res.status(200).send({ message: `User with ID ${id} was removed.` });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: 'The user could not be removed',
      });
    });
});

// ####### Posts #######

///////////////
// Listen
///////////////
server.listen(port, () => {
  console.log(`\n=== API running on port ${port} ===\n`);
});
