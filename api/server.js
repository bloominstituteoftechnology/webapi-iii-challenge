const express = require('express');

const configureMiddleware = require('../config/middleware');
const routes = require('../config/routes');

const server = express();

configureMiddleware(server);

routes.usersRouter(server);

module.exports = server;