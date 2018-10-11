const express = require('express');
const port = 8000;

// SETUP
const server = express();
server.use(express.json());

// ROUTE HANDLERS
server.use('/users/', userRoutes);
server.use('/posts', postRoutes);

// PORT LISTENERS
server.listen(port, () => console.log(`===${port} is online!===`))