const express = require('express');
// Routing Servers
const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
const tagRoutes = require('./routes/tags');

// Server Creation
const server = express();

// Middleware
server.use(express.json());


// Route Handling
server.use('/api/users', userRoutes);
server.use('/api/posts', postRoutes);
server.use('/api/tags', tagRoutes);

server.get('/', (req, res) => {
  res.json({status: 'Server working'});
});

// Server Listening
server.listen(5000);