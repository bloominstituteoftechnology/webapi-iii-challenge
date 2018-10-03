const db = require('./data/helpers/userDb');

const express = require('express');
const cors = require('cors');
const server = express();
const logger = require('morgan');
const helmet = require('helmet');

const yell = (req, res, next) => {
    const newName = req.body.name.toUpperCase();
    req.name = newName;
    next();
};

server.use(logger('combined'));
server.use(cors());
server.use(express.json());
server.use(helmet());

server.get('/users', (req, res) => {
    db.get().then(users => {
        res.json(users);
    })
});

server.get('/users/:id', (req, res) => {
    const { id } = req.params;
    db.get(id)
      .then(user => {
          if(!user) {
              return res.status(404).send({message: `no user with that id`});
          }
          console.log(user.name);
          res.json(user.name);
      })
      .catch(err => console.error(err))
});

server.post('/users', yell, (req, res) => {
    const { name } = req.body;
    const newUser = { name };
    db.insert(newUser)
      .then(userId => {
          const { id } = userId;
        db.get(id)
          .then(user => {
              console.log(req.name);
              if(!user){
                  return res.status(400).send({errorMessage: "Please provide name for user"})
              }
              res.status(201).json(user)
          });
      }) 
      .catch(err => console.error(err))
});

server.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    db.remove(id)
      .then(removeUser => {
         console.log(removeUser);
         res.status(200).json(removeUser);
      })
      .catch(err => console.error(err))
    res.send(req.params);
});

server.put('/users/:id', yell, (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const newUser = { name };
    db.update(id, newUser)
      .then(user => {
          res.status(200).json(user)
      })
      .catch(err => console.error(err));
});

const port = 5000;
server.listen(port, () => console.log(`API running on port ${port}`));