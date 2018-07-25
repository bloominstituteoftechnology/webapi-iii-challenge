const express = require('express');
const postDb = require('./data/helpers/postDb');
const tagDb = require('./data/helpers/tagDb');
const userDB = require('./data/helpers/userDB');

const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    res.send('<h1>Hello</h1>');
})

server.listen(8000, () => console.log('API is running on port 8000'))