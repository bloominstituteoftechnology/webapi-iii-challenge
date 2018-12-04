const express = require('express');
const userDb = require('./data/helpers/userDb');
const postDb = require('./data/helpers/postDb');

const server = express();
const PORT = 4100;

//middleware
server.use(express.json());


//route handlers

//GET
server.get('/users', (req, res) => {
    userDb.get()
        .then((users) => {
            res.json(users)
        })
        .catch(err => {
            res
            .status(500)
            .json({
                message: "Could not fetch the Hobbits. They're hiding."
            })
        })
})

server.get('/posts', (req, res) => {
    postDb.get()
    .then((posts)=>{
        res.json(posts)
    })
    .catch(err => {
        res
        .status(500)
        .json({
            message: "Could not fetch those quotes. They're hiding."
        })
    })
})

server.get('/posts/:id', (req, res) => {
    const {id} = req.params;
    postDb.get(id)
        .then(posts => {
            if(posts) {
                console.log("get posts by id", posts);
                res.json(posts)
            } else {
                res
                .status(404)
                .json({
                    message: "This hobbit does not have any notable quotes. Perhaps search for a better one."
                })
            }
        })
        .catch(err => {
            res
            .status(500)
            .json({
                message: "Failed to find those quotes."
            })
        })
})

server.get('/users/:id', (req, res) => {
    const {id} = req.params;
    userDb.get(id)
        .then(user => {
            if(user) {
                res.json(user)
            } else {
                res
                .status(404)
                .json({
                    message: "This hobbit does not exist."
                })
            }
        })
        .catch(err => {
            res
            .status(500)
            .json({
                message: "Failed to find this hobbit"
            })
        })
})


server.get('/users/:id/posts', (req, res) => {
    const {id} = req.params;
    userDb.get(id)
        .then(user => {
            if (user) {
                userDb.getUserPosts(id)
                    .then(user => {
                        console.log('user from getUserPosts', user)
                        res.json(user);
                    })
            } else {
                res
                .status(404)
                .json({
                    message: "This Hobbit does not exist so we cannot quote it."
                })
            }
        })
        .catch(err=>{
            //500
            res
            .status(500)
            .json({
                message: "Failed to find this Hobbit or its quotes."
            })
        })
})

//POST

server.post('/users', (req, res) => {
    const user = req.body;
    if (user.name) {
        userDb.insert(user)
            .then(userId => {
                userDb.get()
                    .then(users => {
                        res.json(users[0])
                    })
            })
            .catch(err => {
                res
                .status(500)
                .json({
                    message: "Could not create a new Hobbit."
                })
            })
    } else {
        res
        .status(400)
        .json({
            message: "A new Hobbit needs a name. How else can we call for it?"
        })
    }
})



//listening
server.listen(PORT, ()=> {
    console.log(`Server is alive at ${PORT}`);
});