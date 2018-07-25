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
//userDb
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
        if(req.body.name.length > 128) {
            res.status(BAD_REQUEST_CODE).json({error: 'Maximum name length is 128, please make a shorter name'});
            res.end();
            return;
        }
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
        if(updateResponse === 0) {
            throw NOT_FOUND_CODE;
        }
        res.status(OK_CODE).json(updateResponse);
    }
    catch(err) {
        switch(err) {
        case BAD_REQUEST_CODE: {
            res.status(BAD_REQUEST_CODE).json({ errorMessage: 'Please provide a name for the user'});
            res.end();
            return;
        }
        case NOT_FOUND_CODE: {
            res.status(NOT_FOUND_CODE).json({ errorMessage: 'There was no user by that id that can be updated'});
            res.end();
            return;
        }
        default: {
        res.status(INTERNAL_SERVER_ERROR_CODE).json({ error: 'The user information could not be modified'});
        res.end();
        }
    }
}
});
server.delete('/api/users/:id', async (req, res) => {
    try {
        const id = req.params.id
        const deleteResponse = await userDb.remove(id);
        if(deleteResponse === 0) {
            throw NOT_FOUND_CODE;
        }
        res.status(200).json(deleteResponse);
    }
    catch (err) {
        switch(err) {
            case NOT_FOUND_CODE: {
                res.status(NOT_FOUND_CODE).json({ errorMessage: 'The user could not be deleted because there is no user with that id'});
                res.end();
                break;
            }
            default: {
                res.status(INTERNAL_SERVER_ERROR_CODE).json({ error: 'The user could not be deleted at this time.'})
                res.end();
            }
        }
    }
});
//postsDb
server.get('/api/posts', async (req, res) => {
    try {
    const posts = await postDb.get();
    res.status(OK_CODE).json(posts);
    } catch (err) {
        res.status(NOT_FOUND_CODE).json({ error: 'Posts cannot be found' });
    }
})
server.get('/api/posts/:id', async (req, res) => {
    try {
    const { id } = req.params;
    const post = await postDb.get(id);
    if(post === undefined) {
        res.status(NOT_FOUND_CODE).json({ error: 'The post with that id cannot be found'});
        res.end();
        return;
    }
    res.status(OK_CODE).json(post);
    } catch (err) {
        res.status(NOT_FOUND_CODE).json({ error: 'Post cannot be found' });
    }
})

server.post('/api/posts', async (req, res) => {
    try {
        const { userId, text } = req.body;
        if(userId === undefined || text === undefined) {
            throw BAD_REQUEST_CODE;
        }
        const postResponse = postDb.insert(req.body);
        res.status(OK_CODE).json(postResponse);
    } 
    catch (err) {
        switch(err) {
            case BAD_REQUEST_CODE: {
                res.status(BAD_REQUEST_CODE).json({ errorMessage: 'There needs to be a user ID and text in order to create post'});
                res.end();
                return;
            }
            default: {
            res.status(INTERNAL_SERVER_ERROR_CODE).json({error: 'Error creating post'})
            }
        }
    }
})
server.put('/api/posts/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const { userId, text } = req.body;

        if(userId === undefined || text === undefined) {
            throw BAD_REQUEST_CODE;
        }
        const updateResponse = await postDb.update(id, req.body);
        if(updateResponse === 0) {
            throw NOT_FOUND_CODE;
        }
        res.status(OK_CODE).json(updateResponse);
    }
    catch(err) {
        switch(err) {
        case BAD_REQUEST_CODE: {
            res.status(BAD_REQUEST_CODE).json({ errorMessage: 'Please provide text and a userId'});
            res.end();
            break;
        }
        case NOT_FOUND_CODE: {
            res.status(NOT_FOUND_CODE).json({ errorMessage: 'There was no post by that id that can be updated'});
            res.end();
            break;
        }
        default: {
        res.status(INTERNAL_SERVER_ERROR_CODE).json({ error: 'The post information could not be modified'});
        res.end();
        }
    }
}
});
server.delete('/api/posts/:id', async (req, res) => {
    try {
        const id = req.params.id
        const deleteResponse = await postDb.remove(id);
        if(deleteResponse === 0) {
            throw NOT_FOUND_CODE;
        }
        res.status(200).json(deleteResponse);
    }
    catch (err) {
        switch(err) {
            case NOT_FOUND_CODE: {
                res.status(NOT_FOUND_CODE).json({ errorMessage: 'The user could not be deleted because there is no user with that id'});
                res.end();
                break;
            }
            default: {
                res.status(INTERNAL_SERVER_ERROR_CODE).json({ error: 'The user could not be deleted at this time.'})
                res.end();
            }
        }
    }
});
server.listen(8001);