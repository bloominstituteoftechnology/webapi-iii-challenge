// Base Requirement:
const express = require('express');

// Middleware requires
const morgan = require('morgan');
const helmet = require('helmet');
const customMW = require('./middleware.js');

// App Requirements:
const users = require('./data/helpers/userDb');

// Server:
const server = express();
const PORT = 5454;

// Middleware:
server.use( 
  express.json(),
  morgan('dev'),
  helmet(),
  customMW.fixCase
);


// Route handler endpoint for GET - barebones for now,
// will customize after server is operational.
server.get( '/', (req, res) => {
  res.json( {message: "Got it!"} );
});

//-------- User Info: --------//
// GET:
server.get( '/user', (req, res) => {
  users.get()
    .then( listUsers => {
      res.json(listUsers);
    })
    .catch( err => {
      res.status(500).json({ error: "The user information could not be retrieved."});
    });
});

server.get( '/user/:id', (req, res) => {
  const { id } = req.params;
  users.get(id)
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

// POST:
server.post( '/user', (req, res) => {
  const user = req.body;

  // Check for empty name:
  if( !user.name ){
    res.status(400).json({ error: "Please provide the name for the user."});
  } else {
    users.insert(user)
    .then( userId => {
      users.get(userId.id)
        .then( showUser => {
          res.json(showUser);
        });
    })
    .catch( err => {
      res.status(500).json({ error: "There was an error adding the user."});
    });

  }
});

// PUT:
server.put( '/user/:id', (req, res) => {
  const user = req.body;
  const { id } = req.params;

  if( user.name ){
    users.update(id, user)
      .then( () => {
        users.get(id)
          .then( showUser => {
            res.json(showUser);
          });
      })
      .catch( err => {
        res.status(500).json( {error: "There was an error updating the user."} );
      });
  } else {
    res.status(400).json({ error: "Please provide the name for the user." });
  }
});

// DELETE:
server.delete( '/user/:id', (req, res) => {
  const { id } = req.params;

  users.remove(id)
    .then( () => {
      res.json({ message: `User ID ${id} deleted.`});
    })
    .catch( err => {
      res.status(500).json({error: "There was an error deleting the user."});
    });
});



// Listen for incoming requests. Must always be last in file.
server.listen( PORT, () => {
  console.log( `Server listening on port: ${PORT}.`);
} );