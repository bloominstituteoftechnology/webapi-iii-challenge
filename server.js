const express = require('express');
const cors = require('cors');
// const helmet require('helmet');
const server = express();

const userDb = require('./data/helpers/userDb');

server.use(express.json());
server.use(cors());

server.use(express.json());
server.use(cors());
// server.use(helmet());

server.get('/api/users', (req, res) => {
    userDb
    .get()
    .then((response) => res.status(200).send(response))
.catch(() => res.status(500).send({ error: 'Error fetching users' }))
});

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    userDb
    .get(id)
    .then((response) => response.length === 0
    ? res.status(200).send({error: `User not found`})
    : res.status(200).send(response))
.catch(() => res.status(500).send({ error: 'Error fetching users' }))
});




  
server.listen(5000, console.log('Listening'));