const userDb = require('./data/helpers/userDb');
const postDb = require('./data/helpers/postDb');
const tagDb = require('./data/helpers/tagDb');

const express = require('express');
const morgan = require('morgan');

const server = express();

server.use(express.json());
server.use(morgan('tiny'))

server.get('/users', async (req, res) => {
    try {
        const users = await userDb.get()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).send({ error: 'Users information could not be retrieved.' })
    }
})

server.listen(8000, () => console.log('API running on port 8000'));