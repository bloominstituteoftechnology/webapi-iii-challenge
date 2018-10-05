const express = require('express');
const applyGlobalMiddleware = require('./config/middleware/global.js');

const { usersRoutes, postsRoutes } = require('./routes');

const server = express();
const port = 5000;

// apply global middleware
applyGlobalMiddleware(server);

server.use('/api/users', usersRoutes);
server.use('/api/posts', postsRoutes);

server.listen(port, () => {
	console.log(`\n=== Listening on port ${ port } ===`);
});
