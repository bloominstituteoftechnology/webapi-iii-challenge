const express = require('express');

const server = express();

const logger = require('morgan');
const cors = require('cors');

const userDb = require('./data/helpers/userDb.js');
const postDb = require('./data/helpers/postDb.js');

const caps = (req, res, next) => {
    req.user = req.params.users.toUpperCase();
    next();
}

server.use(logger('combined'));
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
    res.send('Howdy Pardner!');
});

server.get('/users', (req, res) => {
    userDb.get()
    .then(users => {
        console.log('***USERS***', users);
        res.status(200).json(users);
    })
    .catch(() => res.status(500).json({ error: "The users could not be retrieved."}));
});



server.get('/users/:user', caps, (req, res) => {
    res.send(`${req.user}`);
})

const port = 9001;
server.listen(port, () => console.log(`The server is running on port ${port}, m'lady`));