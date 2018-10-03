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
server.get('/users', (req, res) => {
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

// ####### Posts #######

///////////////
// Listen
///////////////
server.listen(port, () => {
  console.log(`\n=== API running on port ${port} ===\n`);
});
