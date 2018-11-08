const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');


const dbPost = require('../data/helpers/postDb.js');

const dbTag = require('../data/helpers/tagDb.js');

const dbUser = require('../data/helpers/userDb.js');

const users = require('../users/users.js');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan('short'));
server.use(users);

server.get('/', (req, res) => {
    res.status(200).json({ api: 'running' });
});

server.get('/api/users/:id', (req, res) => {
    const {id} = req.params;
    dbUser.get(id)
    .then(user => {
        res.status(200).json(user);
    })
    .catch(error => {
        res.status(404).json({error: "USER NOT FOUND"})
    })
})

server.get('/api/users/posts/:id', (req, res) => {
    const {id} = req.params;
    dbUser.getUserPosts(id)
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(error => {
        res.status(404).json({error: "USER NOT FOUND"})
    })
})


server.post('/api/users', users, async (req,res) => {
    try {
        const userData = req.body;
        const userId = await dbUser.insert(userData);
        res.status(201).json(userId);
    } catch(error) {
        res.status(500).json({message: "The user could not be added"}, error)
    }
})

server.post('/api/users/posts/:id', async (req,res) => {
    try {
        const postData = req.body;
        const postId = await dbPost.insert(postData);
        res.status(201).json(postId);
    } catch(error) {
        res.status(500).json({message: "The post could not be added"}, error)
    }
})

server.put('/api/users/:id', users, (req, res) => {
    const userData = req.body;
    const {id} = req.params;    
    if (!userData.name) {
        res.status(400).json({errorMessage: "Please provide a username." })
    } else {
        dbUser.update(id, userData).then(count => {
        if(count) {
            res.status(200).json({message: `${count} user updated`})
        } else {
            res.status(404).json({error: "User note found"})
        }
    }).catch(error => {
        res.status(400).json({message: "User information could not be updated"})
    })
    }
})

server.put('/api/users/posts/:userId/:postId', (req, res) => {
    const postData = req.body;
    if (!postData.text) {
        res.status(400).json({errorMessage: "Please provide text." })
    } else {
        dbPost.update(req.params.postId, postData).then(count => {
        if(count) {
            res.status(200).json({message: `${count} post updated`})
        } else {
            res.status(404).json({error: "Post not found"})
        }
    }).catch(error => {
        res.status(400).json({message: "Post could not be updated"})
    })
    }
})

server.delete('/api/users/:id', async (req, res) => {
    const {id} = req.params;
    const removeUser = await dbUser.remove(id);
    try {
        res.status(201).json(removeUser)
    } catch (error) {
        res.status(500).json({message: "User could not be removed"})
    }
})

module.exports = server;
