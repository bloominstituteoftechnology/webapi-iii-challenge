// modules
const express = require('express');
const helmet = require ('helmet');
const cors = require('cors');
const logger = require('morgan');
const userDb = require('./data/helpers/userDb.js');

// server
const server = express();

// middlewares
server.use(express.json());
server.use(logger(`combined`));
server.use(cors());
server.use(helmet());

server.get('/', (req, res) => {
    res.send('Blog');
})

server.get('/api/users', (req, res) => {
    userDb.get().then(users => {
        console.log('\n*** user **', users);
        res.status(200).json(users);
    })
    .catch(err => res.status(500).json({ error: "The information of users could not be retrieved. "}))
})


const port = 9000;
server.listen(port, () => console.log(`Party in port ${port}`))