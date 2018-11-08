const express = require('express');
const postDb = require('./data/helpers/postDb');
const tagDb = require('./data/helpers/tagDB');
const userDb = require('./data/helpers/userDb');

const port = 8000;
const server = express();
server.use(express.json()); 

const upperCaser = (req, res, next) => {
    const { name } = req.body;
    if (name === name.toUpperCase()) {
        next();
    } else {
        name.toUpperCase();
    }
}

server.get('/users)', (req, res) => {
    userDb
        .get()
        .then(userList => {
            res.status(200).json(userList);
        })
        .catch(error => {
            res.status(500).json({ message: "Server Error" });
        })
}
);

server.get('/users/:id', (req, res) => {
    const { id } = reqs.params;
    userDb
        .get(id)
        .then(user => {
            res.status(200).json(user);
        })
        .catch(error => {
            res.status(500).json({ message: "Server Error" });
        })
})  //404?

server.get('/posts', (req, res) => {
    postDb
        .get()
        .then(postList => {
            res.status(200).json(postList);
        })
        .catch(error => {
            res.status(500).json({ message: "Server Error" });
        })
})

server.get('/posts/user/:id', (req, res) => {
    const { id } = req.params;
    userDb  //or postDb?
        .getUsersPosts(id)
        .then(user => {
            res.status(200).json(user);
        })
        .catch(error => {
            res.status(500).json({ message: "Server Error" });
        })
})







server.listen(port, () => console.log(`Server listening at port ${port}`));