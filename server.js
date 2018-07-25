const express = require("express");
const userDb = require("./data/helpers/userDb.js");
const postDb = require("./data/helpers/postDb.js");
const tagDb = require("./data/helpers/tagDb.js");


const server = express();
server.use(express.json());


//USERS
//all users
server.get('/users', (req, res) => {
    userDb
    .get()
    .then(users => {
        res
        .status(200)
        .json(users);
    })
    .catch(err => {
            res
            .status(500)
            .json({ error: "The user information could not be retrieved."});
});
});
//user by id
server.get('/users/:id', (req, res) => {
    userDb
    .get(req.params.id)
    .then(user => {
        if (user.length === 0) {
            res
            .status(404)
            .json({ message: "The user with the specified ID does not exist." });
        }
        res
        .status(200)
        .json(user);
    })
    .catch(err => {
            res
            .status(500)
            .json({ error: "The user information could not be retrieved."});
});
});




//posts
server.get('/posts', (req, res) => {
    postDb
    .get()
    .then(posts => {
        res
        .status(200)
        .json(posts);
    })
    .catch(err => {
            res
            .status(500)
            .json({ error: "The posts information could not be retrieved."});
});
});

//post by ID
server.get('/posts/:id', (req, res) => {
    postDb
    .get(req.params.id)
    .then(post => {
        if (post.length === 0) {
            res
            .status(404)
            .json({ message: "The post with the specified ID does not exist." });
        }
        res
        .status(200)
        .json(post);
    })
    .catch(err => {
            res
            .status(500)
            .json({ error: "The post information could not be retrieved."});
});
});

//tags
server.get('/tags', (req, res) => {
    tagDb
    .get()
    .then(tags => {
        res
        .status(200)
        .json(tags);
    })
    .catch(err => {
            res
            .status(500)
            .json({ error: "The tags information could not be retrieved."});
});
});

//tag by id
server.get('/tags/:id', (req, res) => {
    tagDb
    .get(req.params.id)
    .then(tag => {
        if (tag.length === 0) {
            res
            .status(404)
            .json({ message: "The tag with the specified ID does not exist." });
        }
        res
        .status(200)
        .json(tag);
    })
    .catch(err => {
            res
            .status(500)
            .json({ error: "The tag information could not be retrieved."});
});
});

server.listen(8000, () => console.log("Yo, your API us running on port 8000"));