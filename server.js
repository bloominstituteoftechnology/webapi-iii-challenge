const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const makeRouter = require('./utilities/makeRouter');

const postDb = require('./data/helpers/postDb');
const tagDb = require('./data/helpers/tagDb');
const userDb = require('./data/helpers/userDb');

const server = express();
server.use(helmet());
server.use(morgan('dev'));
server.use(express.json());

server.use('/api/posts', makeRouter('post', 'userId and text', postDb));
server.use('/api/tags', makeRouter('tag', 'tag', tagDb));
server.use('/api/users', makeRouter('user', 'name', userDb));


server.listen(8000, () => { console.log('Listening on Port 8000'); });
