// IMPORTS
const express = require('express');
const userDb = require('./data/helpers/userDb.js');
const postDb = require('./data/helpers/postDb.js');
const port = 8000;

// SETUP
const server = express();
server.use(express.json());

// ROUTE HANDLERS
server.route('/')
  .get((req, res) => {
    res.json({ message: "Hello Universe!" })
  })

// PORT LISTENERS
server.listen(port, () => console.log(`===${port} is online!===`))