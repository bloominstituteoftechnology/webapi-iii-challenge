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
server.get('/api/users/:id', async (req, res) => {
    try {
    const { id } = req.params;
    const user = await userDb.get(id);
    if(user === undefined) {
        res.status(NOT_FOUND_CODE).json({ error: 'The user with that id cannot be found'});
        res.end();
        return;
    }
    res.status(OK_CODE).json(user);
    } catch (err) {
        res.status(NOT_FOUND_CODE).json({ error: 'Users cannot be found' });
    }
})

server.post('/api/users', async (req, res) => {
    try {
        if(req.body.name === undefined) {
            res.status(BAD_REQUEST_CODE).json({error: 'Cannot create user without a name'});
            res.end();
            return;
        }
        const postResponse = await userDb.insert(req.body);
        res.status(CREATED_CODE).json(postResponse);
    } 
    catch (err) {
        res.status(INTERNAL_SERVER_ERROR_CODE).json({error: 'Error creating user either this is a server problem or there is a user that already exists by that name'})
    }
})
server.put('/api/users/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const { name } = req.body;

        if(name === undefined) {
            throw BAD_REQUEST_CODE;
        }
        const updateResponse = await userDb.update(id, req.body);
        res.status(OK_CODE).json(updateResponse);
    }
    catch(err) {
        if(err === BAD_REQUEST_CODE) {
            res.status(BAD_REQUEST_CODE).json({ errorMessage: 'Please provide a name for the user'});
            res.end();
            return;
        }

        res.status(INTERNAL_SERVER_ERROR_CODE).json({ error: 'The user information could not be modified'});
        res.end();
    }
});

server.listen(8001);