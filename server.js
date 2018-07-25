const express = require("express");
const userDb = require("./data/helpers/userDb.js");
const postDb = require("./data/helpers/postDb.js");
const tagDb = require("./data/helpers/tagDb.js");


const server = express();
server.use(express.json());


//users
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

server.listen(8000, () => console.log("Yo, your API us running on port 8000"));