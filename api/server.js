const express = require('express');

const configureMiddleware = require('../config/middleware');
const routes = require('../config/routes');

const server = express();

// middleware
configureMiddleware(server);

// routes
routes.usersRouter(server);
routes.postsRouter(server);

module.exports = server;
