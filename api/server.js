const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');


const dbPost = require('../data/helpers/postDb.js');

const dbTag = require('../data/helpers/tagDb.js');

const dbUser = require('../data/helpers/userDb.js');

const users = require('../users/users.js');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan('short'));


server.get('/', (req, res) => {
    res.status(200).json({ api: 'running' });
});

server.get('/api/users/:id', (req, res) => {
    const {id} = req.params;
    dbUser.get(id)
    .then(user => {
        res.status(200).json(user);
    })
    .catch(error => {
        res.status(404).json({error: "USER NOT FOUND"})
    })
})

server.get('/api/users/:id/posts', (req, res) => {
    const {id} = req.params;
    dbUser.getUserPosts(id)
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(error => {
        res.status(404).json({error: "USER NOT FOUND"})
    })
})

server.use(users);
server.post('/api/users', users, async (req,res) => {
    try {
        const userData = req.body;
        const userId = await dbUser.insert(userData);
        res.status(201).json(userId);
    } catch(error) {
        res.status(500).json({message: "The user could not be added"}, error)
    }
})

module.exports = server;
