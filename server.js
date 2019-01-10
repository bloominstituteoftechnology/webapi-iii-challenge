console.log('server.js');

const express = require('express');

const dbu = require('./data/helpers/userDb.js');

const dbp = require('./data/helpers/postDb.js')

const server = express();

//middleware
function upper(req, res, next) {
    const user = req.body;
    user.name = user.name.toUpperCase()
    next();
}

server.use(express.json()); //built-in middleware

server.use(upper);

//routes

server.get('/users', (req, res) => {
    dbu.get()
    .then(u =>{
        res.status(200).json({"users": u})
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

server.get('/users/:id', (req, res) => {
    const id = req.params.id;
    dbu.getUserPosts(id)
    .then(usersPosts => {
        res.status(200).json(usersPosts)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

server.get('/posts', (req, res) => {
    dbp.get()
    .then(p => {
        res.status(200).json(p)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})


server.post('/users', upper, (req, res) => {
    const newUser = req.body;
    if(newUser.name){
        dbu.insert(newUser)
        .then(name => {
            res.status(201).json(name);
        })
        .catch(err => res.status(500).json({ error: err }));
    } else {
        res.status(400).json({ error: 'error' })
    }
})

server.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    dbu.remove(id)
    .then(removal => {
        res.status(200).json(removal)
    })
    .catch(err => res.status(500).json(err))
})

server.put('/users/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;

    dbu.update(id, changes)
        .then(updated => {
            if (!updated){
                res.status(400).json({ message: "The post with the specified ID does not exist " })
            } else {
                res.status(200).json(updated)
            }
        })
})

module.exports = server;