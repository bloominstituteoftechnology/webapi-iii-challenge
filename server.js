// Imports node modules
const express = require('express');

const userRoutes = require('./userRoute');
const postRoutes = require('./postRoute');
const tagRoutes = require('./tagRoute');

// Server setup
const server = express();

// Add middleware
server.use(express.json());
server.use('/api/users', userRoutes);
server.use('/api/posts', postRoutes);
server.use('/api/tags', tagRoutes);

// GET method to send data to initial page
server.get('/', (req,res) => {
    res.send('Got a server set up');
})

// Server attached to a port

const port = 5000;
server.listen(port, () => {console.log(`Server is listening in port: ${port} `)})