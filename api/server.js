const express = require('express')
const server = express();
const userDb = require('../data/helpers/userDb');
server.use(express.json());

function allCaps(req, res, next) {
    req.body.name = req.body.name.toUpperCase();
    next();
}

server.use(allCaps)

server.get('/user/:id', (req, res) => {
    userDb.get(req.params.id)
        .then(user => {
            if(user) {
                res.status(200).json(user)
            } else {
                res.status(404).json({ message: 'user not found' })
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'The user ID can not be found', error: err })
        })
})

server.get('/user/posts/:id', (req, res) => {
    userDb.getUserPosts(req.params.id)  
        .then(users => {
            if(users.length === 0 ) {
                res.status(404).json({ message: 'can not find users posts' })
                } else {
                res.status(200).json(users)
            }
        })
        .catch(err => {
            res.status(500).json({ message: `the posts from ${req.params.id} can not be found` })
        })    
})

server.post('/user', allCaps, (req, res) => {
    const post = req.body
   userDb.insert(post)
    .then(user => {
        if(!req.body.name) {
            res.status(400).json({ message: 'Please provide a name' })
        } else {
            res.status(201).json(post)
        }
    }) 
    .catch(err => {
        res.status(500).json({ message: 'Error adding user to database' })
    })
})








module.exports = server;