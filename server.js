// Imports node modules
const express = require('express');

// Server setup
const server = express();

// Access databases
const postDb = require('./data/helpers/postDb');
const tagDb = require('./data/helpers/tagDb');
const userDb = require('./data/helpers/userDb');

// Add middleware
server.use(express.json());

// GET method to send data to initial page
server.get('/', (req,res) => {
    res.send('Got a server set up');
})

// GET method 

// Server attached to a port

const port = 5000;
server.listen(port, () => {`Server is listening in localhost: ${port} `})