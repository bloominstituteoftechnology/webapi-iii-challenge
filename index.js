// Base Requirement:
const express = require('express');

// Middleware requires
const morgan = require('morgan');
const helmet = require('helmet');
const userRouter = require('userRouter.js');

// Server:
const server = express();
const PORT = 5454;

// Middleware:
server.use( 
  express.json(),
  morgan('dev'),
  helmet(),
  cors(),
  customMW.fixCase
);
server.use('/api/user', userRouter);

// Route handler endpoint for GET - barebones for now,
// will customize after server is operational.
server.get( '/', (req, res) => {
  res.json( {message: "Got it!"} );
});





// Listen for incoming requests. Must always be last in file.
server.listen( PORT, () => {
  console.log( `Server listening on port: ${PORT}.`);
} );