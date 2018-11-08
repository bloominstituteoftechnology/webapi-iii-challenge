const express = require('express');

const server = express();



const dbUser = require('../data/helpers/userDb.js');

const users = require('../users/users.js');

const configureMiddleware = require('../config/middleware.js');

configureMiddleware(server)

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


server.post('/api/users', users, async (req,res) => {
    try {
        const userData = req.body;
        const userId = await dbUser.insert(userData);
        res.status(201).json(userId);
    } catch(error) {
        res.status(500).json({message: "The user could not be added"}, error)
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
