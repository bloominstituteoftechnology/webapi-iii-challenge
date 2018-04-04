const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const db = require('./data/helpers/userDb.js');

const server = express();

// middleware
server.use(morgan('dev'));
server.use(helmet());
server.use(express.json());

server.get('/', function (req, res) {
  res.json({ api: 'Running...' });
});

server.get('/api/users', (req, res) => {
  db
    .get()
    .then(users => {
      console.log(JSON.stringify(users));
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.get('/api/users/:id', (req, res) => {
  const { id } = req.params;

  db
    .findById(id)
    .then(users => {
      res.json(users[0]);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.post('/api/users', (req, res) => {
  const user = req.body;
  db
    .insert(user)
    .then(response => {
      res.status(201).json(response);
    })
    .catch(error => {
      res.status(500).json({
        error: 'There was an error while saving the user to the database',
      });
    });
});

server.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  let user;

  db
    .findById(id)
    .then(response => {
      user = { ...response[0] };

      db
        .remove(id)
        .then(response => {
          res.status(200).json(user);
        })
        .catch(error => {
          res.status(500).json(error);
        });
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const update = req.body;

  db
    .update(id, update)
    .then(count => {
      if (count > 0) {
        db.findById(id).then(updatedUsers => {
          res.status(200).json(updatedUsers[0]);
        });
      } else {
        res
          .status(404)
          .json({ message: 'The user with the specified ID does not exist.' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

const port = 5000;
server.listen(port, () => console.log('API Running on port 5000'));