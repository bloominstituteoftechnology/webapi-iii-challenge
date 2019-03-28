const express = require('express');
//const helmet = require('helmet');
//const cors = require('helmet');
const server = express();

const postRouter = require('./data/routers/post-route.js')
const userRouter = require('./data/routers/user-route.js')
//middleware
server.use(express.json());
server.use('/users', userRouter)
server.use('/posts', postRouter)

server.get('/', (req, res, next) =>{
    res.send(`
    <h2>Projecto Workio</h2>
    `);
})

module.exports = server;