const express = require('express');

const server = express();

server.use(express.json());

const postRouter = require('./routers/postRoutes.js');
const userRouter = require('./routers/userRoutes.js')

server.use('./api/posts', postRouter);
server.use('/api/users', userRouter);
server.use(uppercase);

server.get('/', (req, res) => {
    res.send(`
        <h2>Challenge III<h2>
    `)
})

function uppercase(req, res, next) {
    let {name} = req.body;
    const upperCaseName = name.charAt(0).toUpperCase()+name.slice(1);
    req.body.name = upperCaseName;

    next();
}

module.exports = server;