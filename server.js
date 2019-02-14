const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const usersRouter = require('./data/routers/users-router.js')
const postsRouter = require('./data/routers/posts-router.js')


const server = express();
server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));


// function loggedIn(userId) {
//     return function(req, res, next) {
//         const id = req.headers.id;
//         if (id === userId) {
//             next();
//         } else {
//             res.status(401).json({message: "please add a user id before creating a new post"})
//         }
//     }
// }

server.use('/api/users', usersRouter)
server.use('/api/posts', postsRouter)

module.exports = server;