const express = require('express');

const postDb = require('./data/helpers/postDb.js');
const userDb = require('./data/helpers/userDb.js');
const tagDb = require('./data/helpers/tagDb.js');

const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    res.send('api running smoothly')
});

server.get('/home', (req, res) => {
    userDb
    .get()
    .then((response) => res.status(200).send(response))
    .catch(() => res.status(500).send({ error: 'Error fetching users' }))
});



server.listen(6000, () => console.log('Api Running on Port 6000'));