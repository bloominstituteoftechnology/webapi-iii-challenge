const express = require('express');
const cors = require('cors');

//const db = require('./data/db.js) --> if there's only one db.js in data folder
//but it's becoz the data are kepts in helper folder so we have to get the data as below.
const users = require('./data/helpers/userDb.js');
const posts = require('./data/helpers/postDb.js');
const tags = require('./data/helpers/tagDb.js');

const port = 5000;
const server = express();
server.use(express.json());
server.use(cors({ origin: 'http://localhost:3000'}));

//----------- all end point starts here -----------//

server.get('/', (reg, res) => {
    res.send('Hello from Server Port 5000 (^_^)');
})

//----------- users end point -----------//

server.get('/api/users', (req, res) => {
    users
        .get()
        .then(users => {
            res.json({ users })
        })
        .catch(error => {
            console.error(error);
        })
})

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    users
        .get(id)
        .then(users => {
            res.json({ users })
        })
        .catch(error => {
            console.error(error);
        })
})

server.post('/api/users', (req, res) => {
    const { name } = req.body;
    users
        .insert({ name })
        .then(newUser => {
            res.status(201).json({ newUser })
        })
        .catch(error => {
            console.error(error);
        })
})

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    users
        .remove(id)
        .then(deletedUser => {
            res.json({ deletedUser })
        })
        .catch(error => {
            console.error(error);
        })
})

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    users
        .update(id, { name })
        .then( updatedUser => {
            res.json({ updatedUser });
        })
        .catch(error => {
            console.error(error);
        })
})

//----------- posts end point -----------//

server.get('/api/posts', (req, res) => {
    posts
        .get()
        .then(posts => {
            res.json({ posts })
        })
        .catch(error => {
            console.error(error);
        })
})

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    posts
        .get(id)
        .then(posts => {
            res.json({ posts })
        })
        .catch(error => {
            console.error(error);
        })
})

server.post('/api/posts/:userId', (req, res) => {
    const { userId } = req.params;
    const { text } = req.body;
    posts
        .insert({ userId, text })
        .then(newPost => {
            res.status(201).json({ newPost })
        })
        .catch(error => {
            console.error(error);
        })
})

server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    posts
        .remove(id)
        .then(deletedPost => {
            res.json({ deletedPost })
        })
        .catch(error => {
            console.error(error);
        })
})

server.put('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    posts
        .update(id, { text })
        .then( updatedPost => {
            res.json({ updatedPost });
        })
        .catch(error => {
            console.error(error);
        })
})

//----------- tags end point -----------//

server.get('/api/tags', (req, res) => {
    tags
        .get()
        .then(tags => {
            res.json({ tags })
        })
        .catch(error => {
            console.error(error);
        })
})

server.get('/api/tags/:id', (req, res) => {
    const { id } = req.params;
    tags
        .get(id)
        .then(tags => {
            res.json({ tags })
        })
        .catch(error => {
            console.error(error);
        })
})

server.post('/api/tags', (req, res) => {
    const { tag } = req.body;
    tags
        .insert({ tag })
        .then(newTag => {
            res.status(201).json({ newTag })
        })
        .catch(error => {
            console.error(error);
        })
})

server.delete('/api/tags/:id', (req, res) => {
    const { id } = req.params;
    tags
        .remove(id)
        .then(deletedTag => {
            res.json({ deletedTag })
        })
        .catch(error => {
            console.error(error);
        })
})

server.put('/api/tags/:id', (req, res) => {
    const { id } = req.params;
    const { tag } = req.body;
    tags
        .update(id, { tag })
        .then( updatedTag => {
            res.json({ updatedTag });
        })
        .catch(error => {
            console.error(error);
        })
})


server.listen(port, () => console.log(`Server is running on port ${port}`));