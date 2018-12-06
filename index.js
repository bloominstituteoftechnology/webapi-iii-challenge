// Base Requirement:
const express = require('express');

// Middleware requires
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const userRouter = require('./userRouter');
const postRouter = require('./postRouter');

// Server:
const server = express();
const PORT = 5454;

// Middleware:
server.use( 
  express.json(),
  morgan('dev'),
  helmet(),
  cors()
);
server.use('/api/user', userRouter);
server.use('/api/post', postRouter);

// Route handler endpoint for GET - barebones for now,
// will customize after server is operational.
server.get( '/', (req, res) => {
  res.json( {message: "Got it!"} );
});





// Listen for incoming requests. Must always be last in file.
server.listen( PORT, () => {
  console.log( `Server listening on port: ${PORT}.`);
} );