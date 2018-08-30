const express = require('express');
const userRoutes  = require('./users/userRoutes.js')
const postRoutes  = require('./posts/postRoutes.js')
const dbUsers = require('./data/helpers/userDb.js')

const server = express();

function uppercase (req, res, next) {
    req.body.name = req.body.name.toUpperCase();
    next();
}

server.use(express.json());

server.use('/users', userRoutes);
server.use('/posts', postRoutes);

server.listen(8000, () => console.log('\n== API on port 8000 ==\n'));