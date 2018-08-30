const express = require('express');
const path = require('path');
const server = express();

const postRoutes = require('./posts/postRoutes.js');
  //brings in post endpoints
const userRoutes = require('./users/userRoutes.js');
  //brings in user endpoint
const configMiddleware = require('./config/middleware.js');
  //brings in global middleware
configMiddleware(server);
  //enacts the middleware on the server

server.use('/users/', userRoutes)
server.use('/posts/', postRoutes)

server.listen(5000, () => console.log('server running on 5k'))
