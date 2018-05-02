// Imports dependencies
const express = require('express');

// Add middleware
const server = express();

// GET method
server.get('/', (req,res) => {
    res.send('Got a server set up');
})

// Server attached to a port

const port = 5000;
server.listen(port, () => {`Server is listening in localhost: ${port} `})