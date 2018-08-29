const express = require('express');
const userDb = require('./data/helpers/userDb.js');
const postDb = require('./data/helpers/postDb');
const server = express();
server.use(express.json());



function auth(req, res, next){
    if(req.body.name.charAt(0) !== req.body.name.charAt(0).toLowerCase()){
        next(); 
    } else {
        res.status(400).json({error: "User Name must be capitalized."})
    }
}

//==========================USERDB ENDPOINTS ===============================

server.get('/users/:id', (req, res) => {
    userDb.get(req.params.id)
        .then(users => { 
            res.status(200).json(users); 
        })
        .catch(err => {
            res.status(500).json({error: "The users information could not be retrieved."})
        })
})

server.get('/user-posts/:id', (req, res) => {
    userDb.getUserPosts(req.params.id)
        .then(users => { 
            res.status(200).json(users); 
        })
        .catch(err => {
            res.status(500).json({error: "The user's posts could not be retrieved."})
        })
})

server.post('/users', auth, (req, res) => {
    userDb.insert(req.body)
        .then(users => { 
            res.status(200).json(users); 
        })
        .catch(err => {
            res.status(500).json({error: "The user could not be created."})
        })
})

server.put('/users/:id', auth, (req, res) => {
    userDb.update(req.params.id, req.body)
        .then(users => { 
            res.status(200).json(users); 
        })
        .catch(err => {
            res.status(500).json({error: "The user could not be updated."})
        })
})

server.delete('/users/:id', (req, res) => {
    userDb.remove(req.params.id)
        .then(users => { 
            res.status(200).json(users); 
        })
        .catch(err => {
            res.status(500).json({error: "The user could not be deleted."})
        })
})


//==========================POSTDB ENDPOINTS ===============================

server.get('/posts/:id', (req, res) => {
    postDb.get(req.params.id)
        .then(posts => { 
            res.status(200).json(posts); 
        })
        .catch(err => {
            res.status(500).json({error: "The post information could not be retrieved."})
        })
})

server.get('/posts-tags/:id', (req, res) => {
    postDb.getPostTags(req.params.id)
        .then(posts => { 
            res.status(200).json(posts); 
        })
        .catch(err => {
            res.status(500).json({error: "The post's tags could not be retrieved."})
        })
})

server.post('/posts', (req, res) => {
    postDb.insert(req.body)
        .then(posts => { 
            res.status(200).json(posts); 
        })
        .catch(err => {
            res.status(500).json({error: "The post could not be created."})
        })
})

server.put('/posts/:id', (req, res) => {
    postDb.update(req.params.id, req.body)
        .then(posts => { 
            res.status(200).json(posts); 
        })
        .catch(err => {
            res.status(500).json({error: "The post could not be updated."})
        })
})

server.delete('/posts/:id', (req, res) => {
    postDb.remove(req.params.id)
        .then(posts => { 
            res.status(200).json(posts); 
        })
        .catch(err => {
            res.status(500).json({error: "The post could not be updated."})
        })
})






server.listen(7000);