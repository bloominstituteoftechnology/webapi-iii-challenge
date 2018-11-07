const express = require('express');

const server = express();
const port = 9001;

const posts = require('./data/helpers/postDb');
const users = require('./data/helpers/userDb');
const tags = require('./data/helpers/tagDb');

server.use(express.json());


server.get('/api/users', (req, res) => {
    users.get()
         .then(user => {
             res.json(user)
         })
         .catch(err => {
             res.json(500).json({ message: 'error users not found'})
         })
})



server.listen(port, () => console.log(`Server listen to port ${port}`))