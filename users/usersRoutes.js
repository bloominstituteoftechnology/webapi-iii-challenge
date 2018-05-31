const users = require('../data/helpers/userDb.js');
const express = require('express');
const server = express();

server.use(express.json());

server.get('/api/users', (req, res) => {

    users.get()
    .then(users => {
        res.json(users)
    })
    .catch(error => {
        res.status(500).json({errorMessage: 'There was an error while retrieving the list of users.'})
    })
})