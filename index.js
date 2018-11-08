const express = require('express');

const configureMiddleware = require('./config/middleware.js')
const userRoutes = require('./users/userRoutes.js')
const postRoutes = require('./posts/postRoute.js')

// server
const server = express();

// middleware file
configureMiddleware(server);

server.use('/api/users', userRoutes); // mount
server.use('/api/posts', postRoutes); // mount


// custom middleware
const upperCaseIt = (req, res, next) => {
    // set new name , modify name to uppercase
    req.body.name = req.body.name.toUpperCase();
    // move in to next piece of middleware
    next();
  };

// routes
server.get('/', (req, res) => {
    res.send('Blog');
})

server.listen(process.env.PORT || port)

