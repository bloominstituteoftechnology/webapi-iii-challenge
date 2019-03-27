
const express = require('express');
const helmet = require('helmet')
const morgan = require('morgan')
// const userRouter = require('./routes/user-routers');
const postsRouter = require('./routes/posts-router.js');
const {nameChecker} = require('./middleware/middleware');

const server = express();


server.use(express.json())
// server.use(cohortNamer)
server.use(helmet())
server.use(morgan('dev'))


server.use('/api/posts', nameChecker, postsRouter);
// server.use('/api/user', userRouter);




server.get('/', (req, res, next) => {
    res.send(`
        <h2> test </h2>
    `)
});

module.exports = server;