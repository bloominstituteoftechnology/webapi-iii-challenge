const userDb = require('./data/helpers/userDb');
const postDb = require('./data/helpers/postDb');
const tagDb = require('./data/helpers/tagDb');

const express = require('express');
const morgan = require('morgan');

// server
const server = express();

// middlware
server.use(express.json()); 
server.use(morgan('tiny'));

// GET CRUD
server.get('/users', async (req, res) => { // GET user
    try {
        const users = await userDb.get();
        res.status(200).json(users)
    } catch (error) {
        res.status(500).send({ error: 'The users information could not be retrieved.' })
    };
});

server.get('/users/:id', async (req, res) => { // GET user/:id
    const {id} = req.params;
    try {
        const user = await userDb.get(id);
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ error: 'Unable to retrieve user.' })
    }
})

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

// POST CRUD
server.post('/users', async (req, res) => {
    if (!req.body || !req.body.name)
        res.status(400).json({ error: 'Please provide name and bio for the user.'})
    const { name } = req.body
    try {
        const { id } = await userDb.insert({ name })
        if (id) {
            res.status(200).json({ id, name })
        }
    } catch (error) {
        res.status(500).json({ error: 'User could not be added.' })
    }
})

// PUT CRUD
server.put('/users/:id', async (req, res) => {
    if (!req.body || !req.body.name)
        res.status(400).json({ error: 'Please provide name and bio for the user.'})
    const { name } = req.body
    try {
        const usedID = await userDb.update(req.params.id, { name });
        if (userID > 0)
            res.status(200).json({ id, name })
    } catch (error) {
        res.status(500).json({ error: 'Unable to update user.' })
    }
})

server.listen(8000, () => console.log('API running on port 8000'));
