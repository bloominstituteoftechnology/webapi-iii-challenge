// console.log('something is running! YO!');

const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');

const userDB = require('./data/helpers/userDb');
const postDB = require('./data/helpers/postDb');

const server = express();

const PORT = 5050;

server.use(express.json());
server.use(helmet());
server.use(logger('tiny'));

server.get('/', (req, res) => {
    res.json({message: "request recieved, YO YO YO!"})
});

// Other CRUD operations below

server.get('/api/users', (req, res) => {
    userDB
        .get()
        .then((users) => {
            res.json(users);
        })
        .catch(err => {
            res
            .status(500)
            .json({error: "The users could not be retrieved."})
        });
});

// Keep this last!

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});