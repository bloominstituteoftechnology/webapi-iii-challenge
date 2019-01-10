const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const usersRouter = require('../users/usersRouter.js');
const postsRouter = require('../posts/postsRouter.js');
const server = express();

//middleware
server.use(cors());
server.use(helmet());
server.use(express.json());
server.use(morgan('short'));

//routes
server.use('/users', usersRouter);
server.use('/posts', postsRouter);

server.get('/', (req, res) => {
    res.send('hiya')
});

//exports
module.exports = server;
