const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const userDb = require('./data/helpers/userDb');
const postDb = require('./data/helpers/postDb');

const server = express();
const port = 3333;

server.use(express.json());

server.listen(port, () => {console.log(`Server Active on Port ${port}`)});

server.get('/users', (req, res) => {
  userDb.get()
  .then(users => res.status(200).send(users))
  .catch(e => res.status(500).json({ e: "The user info could not be found"}));
})
