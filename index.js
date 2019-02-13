// code away!
const express = require('express');
const server = express();
const PORT = 8080;
const userDb = require('./data/helpers/userDb')

server.use(express.json());

console.log('let us get started');

server.get('/', (req, res) => {
    res.send(`hi there from inside an initial get function, on port ${PORT}`)
})

// get a list of all our users

server.get('/api/users', (req, res) => {
    userDb.get()
    .then(users => {
        res.json(users)
    })
    .catch(err => {
        res.status(500)
        res.json(`Huh, can't find those`)
    })
})