const express = require('express');
const cors = require('cors');

const dbUsers = require('./data/helpers/userDb');
const dbPosts = require('./data/helpers/postDb');

const server = express();
const PORT = 5050;
server.use(express.json(), cors());

server.get('/api/users', (req, res)=>{
    dbUsers.get()
        .then(users => users.length ? res.json(users) : res.json({message: "We don't have any user for you right now, please try again later!"}))
        .catch(err => res.status(500).json({error: 'We have an unexpected error while retrieving your users!'}))
})

server.get('/api/posts', (req, res)=>{
    dbPosts.get()
        .then(posts => posts.length ? res.json(posts) : res.json({message: "We don't have any post for you right now, please try again later!"}))
        .catch(err => res.status(500).json({error: 'We have an unexpected error while retrieving your posts!'}))
})


server.listen(PORT, () => console.log(`Server up and running on port: ${PORT}`))