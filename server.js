const express = require('express');
const users = require('./data/helpers/userDb');

const server = express();
const PORT = 3333;

server.use(express.json());



server.get('/', (req, res) => {
    res.json({message: "success"})
});

server.get('/api/users', (req, res) => {
    users.get()
    .then(getUser => {
        res.status(200).json(getUser);
    })
    .catch (err => {
        res.status(500).json({message: "user not found"})
    })
})

server.listen(PORT, err => {
    console.log(`server is listening on port ${PORT}`)
});