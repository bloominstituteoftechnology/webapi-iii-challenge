const express = require('express');
const userDb = require('./data/helpers/userDb.js');
const postDb = require('./data/helpers/postDb.js');
const cors = require('cors');

const server = express();
const PORT = 9000;

// Muiddleware

server.use(cors());
server.use(express.json());

// Endpoints

server.get('/users', (req, res) => {
    userDb.get()
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to load users' })
        })
})

server.get('/users/:id', (req, res) => {

    const { id } = req.params;

    userDb.get(id)
        .then(user => {
            console.log(user)
            if (user) {
                res.json(user)
            } else {
                res.status(404).json({ message: 'The user with specified ID does not exist'})
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to load user' })
        })
})

server.post('/users', (req, res) => {
    
    const user = req.body;

    if (user.name) {
        userDb.insert(user)
            .then(idInfo => {
                userDb.get(idInfo.id).then(user => {
                    res.status(201).json(user)
                })
            })
            .catch(err => {
                res.status(500).json({ message: 'Failed to insert user' })
            })
    } else {
        res.status(400).json({
            message: 'missing name'
        })
    }
})

server.get('/posts', (req, res) => {
    postDb.get()
        .then(posts => {
            res.json(posts)
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to load posts' })
        })
})

// Listen

server.listen(PORT, () => {
    console.log(`Server is alive and well at port ${PORT}`)
});