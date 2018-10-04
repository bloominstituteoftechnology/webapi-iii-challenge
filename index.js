//This file is "the API"

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

// Get all users
server.get('/api/users', (req, res) => {
    userDb
        .get()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({errorMessage: 'An error occured trying to get users'})
        })
});

// Get a specific user
server.get('/api/users/:id', (req, res) => {
    const {id} = req.params;
    userDb
        .get(id)
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(500).json({errorMessage: 'An error occured trying to get a user'})
        })
});

// Get posts from a specific user
server.get('/api/users/:id/userPosts', (req, res) => {
    const {id} = req.params;
    userDb
        .getUserPosts(id)
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            res.status(500).json({errorMessage: `An error occured trying to get a user's posts`})
        })
})

//I need to create a method to take a new user name and convert it to uppercase

// Create a new user
server.post('/api/users/create', (req, res) => {
    const name = req.name;
    const newUser = {name};
    userDb
        .insert(newUser)
        .then(userId => {
            const {id} = userId;
            res.status(200).json(user);
            dbUsers.get(id)
                .then(userName => res.status(200).json(userName))
                .catch(err => console.log(err));
        })
        .catch(err => {
            res.status(500).json({errorMessage: `An error occured trying to create a new user`})
        })
})

// Update a user
server.put('/api/users/:id', (req, res) => {
    const {id} = req.params;
    const {name} = req.body;
    const newName = {name};
    userDb 
        .update(id , newName)
        .then(updatedUser => {
            res.status(200).json(updatedUser);
        })
        .catch(err => {
            res.status(500).json({errorMessage: `An error occured trying to update a user`})
        })
})

//Delete a user
server.delete('/api/users/:id', (req, res) => {
    userDb
        .remove(id)
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({errorMessage: `An error occured trying to delete a user`})
        })
})



// Choose a port and call server.listen on that port
const port = 4000;

server.listen(port, () => 
    console.log(`API is running on port ${port}.`)
);

// hit your port+/ 