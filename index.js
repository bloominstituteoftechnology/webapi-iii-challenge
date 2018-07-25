const OK_CODE = 200;
const CREATED_CODE = 201;
const BAD_REQUEST_CODE = 400;
const NOT_FOUND_CODE = 404;
const INTERNAL_SERVER_ERROR_CODE = 500;


const userDb = require('./data/helpers/userDb');
const postDb = require('./data/helpers/postDb');
const tagDb = require('./data/helpers/tagDb');
const express = require('express');

const server = express();
server.use(express.json());

server.get('/api/users', async (req, res) => {
    try {
    const users = await userDb.get();
    res.status(OK_CODE).json(users);
    } catch (err) {
        res.status(NOT_FOUND_CODE).json({ error: 'Users cannot be found' });
    }
})
