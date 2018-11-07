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

module.exports = server;