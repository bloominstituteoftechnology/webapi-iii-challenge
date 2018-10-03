const express = require('express'); // pull in express
const cors = require('cors');
const server = express(); // instantiate server
const logger = require('morgan');
const db = require('./data/helpers/userDb');

server.use(cors()); // connects react
server.use(express.json()); 

const port = 5201;

server.listen(port, () => {
  console.log(`================Running on port ${port}==============`);
});

server.get('/', (req, res) => {
  db.get()
    .then(users => {
      res.json(users)
    })
    .catch(err => res.send(err))
});