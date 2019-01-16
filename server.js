const express = require('express');

// Route Imports
const postRoutes = require('./posts/postRoutes');
const userRoutes = require('./users/userRoutes');

// Server Creation
const server = express();

// Port Declaration
const port = 4000;

// Routers
server.use('/posts', postRoutes);
server.use('/users', userRoutes);


server.use('/', (req, res) => res.send(`It's working !!\nIt's working !!`));

server.listen(port, () => console.log(`API running on port: ${port}`));