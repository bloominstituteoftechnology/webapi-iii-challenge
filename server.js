const express = require('express');
const userDb = require('./data/helpers/userDb.js');
const postDb = require('./data/helpers/postDb.js');
const tagDb = require('./data/helpers/tagDb.js');

const port = 8000;
const server = express();
server.use(express.json());


server.get('/api/users', (req, res) => {
    userDb
    .get()
    .then(users => {
        res.json({ users });
    })
    .catch(error => {
        res.status(500)
        res.json({ error: "The user information could not be retrieved." })
    });
});


server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    if(!id) {
        res.status(404);
        res.json({ error: "That user ID does not exist" })
        } else {
    userDb
    .get(id)
    .then(user => {
        res.json({ user })
    })
    .catch(error=> {
        res.status(500)
        res.json({ error: "The post information could not be retrieved." })
    });
}
});

server.post('/api/users', (req, res) => {
    const { name } = req.body;
    if(!name) {
        res.status(404);
        res.json({ error: "Please enter a name" })
        } else {
    userDb
    .insert({ name })
    .then(user => {
        res.json({ user })
    })
    .catch(error=> {
        res.status(500)
        res.json({ error: "The user information could not be added." })
    });
    }
});


server.listen(port, () => console.log('API running...'))