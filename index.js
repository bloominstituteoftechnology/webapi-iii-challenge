const express = require('express');
const userDb = require('./data/helpers/userDb.js');
const postDb = require('./data/helpers/postDb');
const server = express();

server.use(express.json());




function auth(req, res, next){
    let [body] = [req.body]

    if(body.name.charAt(0) !== body.name.charAt(0).toLowerCase()){
        next(); 
    } else {
        res.status(400).json({error: "User Name must be capitalized."})
    }
}

//==========================USERDB ENDPOINTS ===============================

server.get('/users/:id', (req, res) => {
    let [id] = [req.params.id]

    userDb.get(id)
        .then(users => { 
            res.status(200).json(users); 
        })
        .catch(err => {
            res.status(500).json({error: "The users information could not be retrieved."})
        })
})

server.get('/user-posts/:id', (req, res) => {
    let [id] = [req.params.id]

    userDb.getUserPosts(id)
        .then(users => { 
            res.status(200).json(users); 
        })
        .catch(err => {
            res.status(500).json({error: "The user's posts could not be retrieved."})
        })
})

server.post('/users', auth, (req, res) => {
    let [body] = [req.body]
    
    userDb.insert(body)
        .then(users => { 
            res.status(200).json(users); 
        })
        .catch(err => {
            res.status(500).json({error: "The user could not be created."})
        })
})

server.put('/users/:id', auth, (req, res) => {
    let [id, body] = [id, req.body]

    userDb.update(id, body)
        .then(users => { 
            res.status(200).json(users); 
        })
        .catch(err => {
            res.status(500).json({error: "The user could not be updated."})
        })
})

server.delete('/users/:id', (req, res) => {
    let [id] = [req.params.id]

    userDb.remove(id)
        .then(users => { 
            res.status(200).json(users); 
        })
        .catch(err => {
            res.status(500).json({error: "The user could not be deleted."})
        })
})


//==========================POSTDB ENDPOINTS ===============================

server.get('/posts/:id', (req, res) => {
    let [id] = [req.params.id]

    postDb.get(id)
        .then(posts => { 
            res.status(200).json(posts); 
        })
        .catch(err => {
            res.status(500).json({error: "The post information could not be retrieved."})
        })
})

server.get('/posts-tags/:id', (req, res) => {
    let [id] = [req.params.id]

    postDb.getPostTags(id)
        .then(posts => { 
            res.status(200).json(posts); 
        })
        .catch(err => {
            res.status(500).json({error: "The post's tags could not be retrieved."})
        })
})

//====BUGGING===============
server.post('/posts', (req, res) => {
    let [body] = [req.body]

    postDb.insert(body)
        .then(posts => { 
            res.status(200).json(posts); 
        })
        .catch(err => {
            res.status(500).json({error: "The post could not be created."})
        })
})

//====BUGGING===============
server.put('/posts/:id', (req, res) => {
    let [id, body] = [id, req.body]

    postDb.update(id, body)
        .then(posts => { 
            res.status(200).json(posts); 
        })
        .catch(err => {
            res.status(500).json({error: "The post could not be updated."})
        })
})

server.delete('/posts/:id', (req, res) => {
    let [id] = [req.params.id]

    postDb.remove(id)
        .then(posts => { 
            res.status(200).json(posts); 
        })
        .catch(err => {
            res.status(500).json({error: "The post could not be deleted."})
        })
})






server.listen(7000);