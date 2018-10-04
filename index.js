const userDb = require('./data/helpers/userDB');
const postDb = require('./data/helpers/postDb');
const express = require('express');
const server = express();
const port = 8144;

server.use(express.json());

server.listen(port, () => {
    console.log(`Server started on port #${port}`)
})

//middleware
const upperCase = (req, res, next) => {
    req.body.name = req.body.name.toUpperCase();
    next();

}


//user routes

server.get("/users", (req, res) => {
    userDb.get().then(users => {
        res.send(users);
    }).catch(err => send.json('There was a problem receiving user and post information'))
})

server.get('/users/:id', (req, res) => {
    const { id } = req.params;
    userDb.get(id).then(user => {
        res.status(202).send(user)
    }).catch(err => res.send(err))
})

server.post('/users', upperCase, (req, res) => {
    // console.log(req.body)
    const { name } = req.body;
    const newUser = { name }
    userDb.insert(newUser)
    .then(user => {
        const { id } = user;
        userDb.get(id).then(user => {
            res.status(201).json(user)
        })
    }).catch(err => res.send(err))
})

server.put('/users/:id', upperCase, (req, res) => {
    const { name } = req.body;
    const { id } = req.params;
    const updated = { name }
    if (!name) {
        return res.status(400).json(`{ error: "Please enter a name" }`)
    }
    userDb.update(id, updated)
        .then(user => {
            res.status(200).json(user);
        }).catch(err => res.send(err))
})

server.delete('/users/:id', (req, res) => {
    console.log(req.params)
    const { id } = req.params;
    if(!id) {
        return res.status(404).send("User not found, were they already deleted?")
    }
    userDb.remove(id).then(removed => {
        res.status(202).json(removed)
    }).catch(err => res.send(err))
})

//post routes

server.get("/posts", (req, res) => {
    postDb.get().then(posts => {
        res.send(posts);
    }).catch(err => send.json('There was a problem receiving user and post information'))
})

server.get('/posts/:id', (req, res) => {
    const { id } = req.params;
    userDb.getUserPosts(id).then(user => {
        res.status(202).send(user)
    }).catch(err => res.send(err))
})

server.post('/posts/:id', (req, res) => {
    // console.log(req.body)
    const { text } = req.body;
    const newPost = { text }
    postDb.insert(newPost)
    .then(post => {
        const { id } = post;
        postDb.get(id).then(post => {
            res.status(201).json(post)
        })
    }).catch(err => res.send(err))
})

server.put('/posts/:id', (req, res) => {
    const { text } = req.body;
    const { id } = req.body;
    const updated = { text }
    if (!text) {
        return res.status(400).json(`{ error: "Please enter a post" }`)
    }
    postDb.update(id, updated)
        .then(post => {
            res.status(200).json(post);
        }).catch(err => res.send(err))
})

server.delete('/posts/:id', (req, res) => {
    const { id } = req.body;
    if(!id) {
        return res.status(404).send("Post not found, was it already deleted?")
    }
    postDb.remove(id).then(removed => {
        res.status(202).json(removed)
    }).catch(err => res.send(err))
})