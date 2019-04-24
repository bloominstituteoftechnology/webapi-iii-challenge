const express = require('express');

const server = express();

server.use(express.json());

const postRouter = require('./routers/postRoutes.js');
const userRouter = require('./routers/userRoutes.js')

server.use('./api/posts', postRouter);
server.use('/api/users', userRouter);

server.get('/', (req, res) => {
    res.send(`
        <h2>Challenge III<h2>
    `)
})

module.exports = server;