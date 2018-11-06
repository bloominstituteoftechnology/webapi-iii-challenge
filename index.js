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

// routes
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

server.get('/api/users/:userId', (req, res) => {
    const { userId } = req.params;
    userDb.get(userId)
    .then(user => {
        if (!user) {
            res.status(404).json({ error: "The user with this ID does not exist."})
        }
        res.status(200).json(user);
    })
    .catch(err => res.status(500).json({ error: "This user information could not be retrieved. "}))
})


const port = 9000;
server.listen(port, () => console.log(`Party in port ${port}`))