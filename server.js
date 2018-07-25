const userDb = require('./data/helpers/userDb');
const postDb = require('./data/helpers/postDb');
const tagDb = require('./data/helpers/tagDb');

const express = require('express');
const morgan = require('morgan');

const server = express();

// middlware
server.use(express.json()); 
server.use(morgan('tiny'));

server.get('/users', async (req, res) => { // GET user
    try {
        const users = await userDb.get();
        res.status(200).json(users)
    } catch (error) {
        res.status(500).send({ error: 'The users information could not be retrieved.' })
    };
});

server.get('/posts', async (req, res) => { // GET post
    try {
        const users = await postDb.get();
        res.status(200).json(users)
    } catch (error) {
        res.status(500).send({ error: 'The posts information could not be retrieved.' })
    };
});

server.get('/tags', async (req, res) => {  // GET tag
    try {
        const users = await tagDb.get();
        res.status(200).json(users)
    } catch (error) {
        res.status(500).send({ error: 'The tags information could not be retrieved.' })
    };
});

server.listen(8000, () => console.log('API running on port 8000'));