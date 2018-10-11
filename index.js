const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const usersDb = require('./data/helpers/userDb.js');
const postsDb =require('./data/helpers/postDb.js');
const port = 7000;

const server = express();
server.use(logger('combined'));
server.use(express.json());

const upper = (req, res, next) => {
    const { newName } = req.body.name.toUpperCase();
    req.body.name = { newName };
    next();
}

server.get('/', (req, res) => {
    res.send("New Blog!");
})

server.get('/api/users', (req, res) => {
    usersDb.get()
    .then(users => {
        console.log(req.params);
        res.status(200).json(users);
    })
    .catch(err => res.send(err));
})

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    usersDb.get(id)
    .then(user => {
        res.status(200).json(user);
    })
    .catch(err => res.send(err));
})

server.post('/api/users', (req, res) => {
    const { name } = req.body;
    const newUser = { name };
    usersDb.insert(newUser)
    .then(user => {
            res.status(201).json(user);
    })
    .catch(err => res.send(err.message));
})

server.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const { name } = req.body;
    const editedUser = { name };
    usersDb.update(id, editedUser)
    .then(user => {
        res.status(200).json(user)
    })
    .catch(err => res.send(err.message));

})

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    usersDb.remove(id)
    .then(removedUser =>{
    res.send(`${removedUser} user has been removed from database`)
    })
    .catch(err => res.send(err.message));
})


server.get('/api/users/:id/posts', (req, res) => {
    const id = req.params.id;
    usersDb.getUserPosts(id)
    .then(userPosts => {
        res.status(200).json(userPosts);
    })
    .catch(err => res.send(err.message));
})

server.get('/api/posts', (req, res) => {
    postsDb.get()
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(err => res.send(err.message));
})

server.get('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    postsDb.get(id)
    .then(post => {
        res.status(200).json(post);
    })
    .catch(err => res.send(err.message));
})

server.post('/api/posts', (req, res) => {
    const { text, userId } = req.body;
    const newPost = { text, userId};
    postsDb.insert(newPost)
    .then(post => {
        res.status(201).json(post);
    })
    .catch(err => res.send(err.message));
})



















server.listen(port, () => {
    console.log(`Server started! Running on port ${port}. `);
})