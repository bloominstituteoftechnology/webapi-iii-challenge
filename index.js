const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

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


// Listen for incoming requests. Must always be last in file.
server.listen( PORT, () => {
  console.log( `Server listening on port: ${PORT}.`);
} );