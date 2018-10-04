const express = require('express');
const logger = require('morgan');
const moment = require('moment');

const configureMiddleware = require('./config/middleware.js');
const postRoutes = require('./posts/postRoutes.js');
const userRoutes = require('./users/userRoutes.js');

const server = express();
const port = 9000;

configureMiddleware(server);

server.use(logger('combined'), express.json());

server.use('/api/users', userRoutes);
server.use('/api/posts', postRoutes);

function runServer() {
    console.log('\x1b[34m', `\n[server] started server`);
    console.log(`[server] running on port: ${port}\n`)
    console.log('\x1b[0m', '');
}

server.listen(port, runServer());
