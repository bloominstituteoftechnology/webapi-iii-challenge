const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const userDb = require("../data/helpers/userDb.js");


const server = express();

server.use(express.json()); // built in
server.use(helmet()); // third party
server.use(morgan('short')); // third party

server.get('/', (req, res) => {
    userDb.get()
    .then( users =>
        res.status(200).json(users))
    .catch( (error) => 
        res.status(500).json({ message: 'could not get users', error })
    )
  });

  server.post('/add', (req, res) => {
    const newUser = req.body;

  userDb.insert(newUser)
  .then( id =>
      res.status(200).json(id))
  .catch( (error) => 
      res.status(500).json({ message: 'could not add user', error })
  )
});

server.put('/edit/:id', (req, res) => {
    const {id} = req.params;
    const editUser = req.body;

  userDb.update(id, editUser)
  .then( id =>
      res.status(200).json(id))
  .catch( (error) => 
      res.status(500).json({ message: 'could not add user', error })
  )
});

  server.delete('/delete/:id', (req, res) => {
      const {id} = req.params;

    userDb.remove(id)
    .then( count =>
        res.status(200).json(count))
    .catch( (error) => 
        res.status(500).json({ message: 'could not delete user', error })
    )
  });

module.exports = server;