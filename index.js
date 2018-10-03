// Pull in express
const express = require('express');
const cors = require('cors');
const userDb = require('./data/helpers/userDb');

// instantiate server
const server = express();

// Build a GET endpoint to '/' (root) that returns something
server.get('/', (req, res) => {
    res.send('This is the response from the server');
});

server.get('/api/users', (req, res) => {
    userDb
        .get()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({errorMessage: 'An error with the server occured'})
        })
});

server.get('/api/users/:id', (req, res) => {
    const {id} = req.params;
    userDb
        .get(id)
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(500).json({errorMessage: 'An error with the server occured'})
        })
});

server.get('/api/users/:id/userPosts', (req, res) => {
    const {id} = req.params;
    userDb
        .getUserPosts(id)
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            res.status(500).json({errorMessage: 'An error with the server occured'})
        })
})

// Call server.listen w/ a port of your choosing
const port = 4000;

server.listen(port, () => 
    console.log(`API is running on port ${port}.`)
);

// hit your port+/ 