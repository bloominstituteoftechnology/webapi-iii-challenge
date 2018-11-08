const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const postDb = require('../helpers/postDb');
const userDb = require('../helpers/userDb');

const server = express();

server.use(express.json());
server.use(helmet()); 
server.use(morgan('short')); 

server.get('/', (req, res) => {
    res.status(200).json({ api: 'running' });
});

server.get('/api/posts', (req, res) => {
    postDb
        .get()
        .then(post => {
            res.status(200).json(post);
        })
        .catch(error => {
            res.status(500).json({error: 'cannot be retrieved', 'error': error})
        });
});

module.exports = server;
