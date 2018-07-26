const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const makeRouter = require('./utilities/makeRouter');
const getChildrenByParent = require('./middlewares/getChildrenByParent');

const postDb = require('./data/helpers/postDb');
const tagDb = require('./data/helpers/tagDb');
const userDb = require('./data/helpers/userDb');

const server = express();
server.use(helmet());
server.use(morgan('dev'));
server.use(express.json());

server.get('/api/posts/:id/tags', (req, res, next) => getChildrenByParent(postDb.getPostTags, req, res, next));
server.use('/api/posts', makeRouter('post', 'userId and text', postDb));


server.use('/api/tags', makeRouter('tag', 'tag', tagDb));
// TODO: uppercase tags middleware

server.get('/api/users/:id/posts', (req, res, next) => getChildrenByParent(userDb.getUserPosts, req, res, next));
server.use('/api/users', makeRouter('user', 'name', userDb));


server.listen(8000, () => { console.log('Listening on Port 8000'); });
