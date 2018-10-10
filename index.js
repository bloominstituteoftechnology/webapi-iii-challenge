const express = require('express');
const port = 8000;

// SETUP
const server = express();
server.use(express.json());

// ROUTE HANDLERS
server.use('/users', );
server.use('/posts', );

// PORT LISTENERS
server.listen(port, () => console.log(`===${port} is online!===`))