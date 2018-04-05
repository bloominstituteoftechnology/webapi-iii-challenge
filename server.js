const express = require('express');
const helmet = require('helmet');

const userRouter = require('./users/userRouter.js');
const postRouter = require('./users/postRouter.js');
const tagRouter = require('./users/tagRouter.js');

const server = express();

function logger(req, res, next) {
    next();
}

server.use(helmet());
server.use(express.json());
server.use(logger);

server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);
server.use('/api/tags', tagRouter);

server.get('/', (req, res) => {
    res.json({ api: 'Running...' });
});

const port = 5000;
server.listen(port, () => console.log('API Running on port 5000'));