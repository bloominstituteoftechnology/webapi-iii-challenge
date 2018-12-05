const express = require('express');
const postDB = require('./data/helpers/postDb.js');
const userDB = require('./data/helpers/userDb.js');

const server = express();
const NUM = 4444;

server.get('/api/users', (req,res) => {
    userDB.get()
    .then((users) => {res.json(users)})
    .catch(err => {
        res
        .status(500)
        .json({message: 'Unable to get users'})})
} )

server.get('/api/posts', (req,res) => {
    postDB.get()
    .then((posts) => {res.json(posts)})
    .catch(err => {
        res
        .status(500)
        .json({message: 'Unable to get posts'})
    })
})

server.get('/api/users/:id'), (req,res) => {
    
}

server.listen(NUM, () => console.log(`listening on port ${NUM}`))