// pull in express
const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const helmet = require('helmet');

// Name port
const port = 8250;

//instanciate your server
const server = express();// creates the server

// add GLOBAL MIDDLEWARE
server.use(express.json());// formatting our req.body obj
server.use(cors());// this neeeded to connect from react
server.use(logger ('combined'));// combined or tiny
server.use(helmet());

//ROUTES

//Add home route
server.get('/', (req, res) => {
  res.send('You are HOME!');
});



// call server.listen w/ a port of 8250
server.listen(port, () =>
  console.log(`\n=== API running on port ${port} ===\n`)
);