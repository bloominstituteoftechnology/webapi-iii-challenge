const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const upperCase = require('../middleware/upperCase')
const userDb = require('../data/helpers/userDb');
const postDb = require('../data/helpers/postDb');

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(morgan('short'));

server.get('/api/users', async (req, res) => {
    try {
        const users = await userDb.get();
        res.status(200).json(users);
    } catch(error) {
        res.status(500).json(error);
    }
})

server.get('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userDb.get(id)
        
        res.status(200).json(user);
    } catch(error) {
        res.status(500).json(error);
    }
});

server.post('/api/users', upperCase, async (req, res) => {
    try {
        const { body } = req;
        const userId = await userDb.insert(body)
        res.status(201).json(userId);
    } catch(error) {
        error.errno === 19 ?
            res.status(406).json('User name already exists')
            :res.status(500).json(error);
    }
});

server.delete('/api/users/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const count = await userDb.remove(id);
        
        count
            ? res.status(200).json({message: `${count} user's deleted`})
            : res.status(404).json({message: 'User not found'})
    } catch(error) {
        res.status.apply(500).json(error);
    }
})

server.put('/api/users/edit/:id', upperCase, async (req, res) => {
    try {
        const { id } = req.params;
        const count = await userDb.update(id, req.body);

        count
            ? res.status(200).json({message: `${count} user's edited`})
            : res.status(404).json({message: 'User not found'})

    } catch(error) {
        res.status.apply(500).json(error);
    }
})

server.get('/api/posts', async (req, res) => {
    try {
        const posts = await postDb.get();
        res.status(200).json(posts);
    } catch(error) {
        res.status(500).json(error);
    }
})


module.exports = server;