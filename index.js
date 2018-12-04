// Base Requirements:
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

// App Requirements:
const users = require('./data/helpers/userDb');

// Server:
const server = express();
const PORT = 5454;

// Middleware:
server.use( 
  express.json(),
  morgan('dev'),
  helmet()
);

// Route handler endpoint for GET - barebones for now,
// will customize after server is operational.
server.get( '/', (req, res) => {
  res.json( {message: "Got it!"} );
});

//-------- User Info: --------//
// GET:
server.get( '/users', (req, res) => {
  users.get()
    .then( listUsers => {
      res.json(listUsers);
    })
    .catch( err => {
      res.status(500).json({ error: "The user information could not be retrieved."});
    });
});

server.get( '/users/:id', (req, res) => {
  const { id } = req.params;
  users
    .get(id)
    .then( listUser => {
      // Check for empty result
      if( listUser ){
        res.json(listUser);
      } else {
        res.status(404).json({ message: "The user does not exist."});
      }
    })
    .catch( err => {
      res.status(500).json({ error: "The user information could not be retrieved."});
    });
});

// Listen for incoming requests. Must always be last in file.
server.listen( PORT, () => {
  console.log( `Server listening on port: ${PORT}.`);
} );