const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const makeRouter = require('./middlewares/makeRouter');
const getChildrenByParent = require('./middlewares/getChildrenByParent');
const upperCaseTags = require('./middlewares/upperCaseTags');

const postDb = require('./data/helpers/postDb');
const tagDb = require('./data/helpers/tagDb');
const userDb = require('./data/helpers/userDb');

const server = express();
server.use(morgan('combined'));
server.use(helmet());
server.use(express.json());

// Helper function to send off response after req is done being modified by middleware
function sendReqPayload(req, res) {
  res.json(req.local.payload);
}

server.get(
  '/api/posts/:id/tags',
  (req, res, next) => getChildrenByParent(postDb.getPostTags, req, res, next),
  upperCaseTags,
  sendReqPayload,
);

server.get(
  '/api/users/:id/posts',
  (req, res, next) => getChildrenByParent(userDb.getUserPosts, req, res, next),
  sendReqPayload,
);

server.use('/api/posts', makeRouter('post', 'userId and text', postDb));
server.use('/api/users', makeRouter('user', 'name', userDb));
server.use('/api/tags', makeRouter('tag', 'tag', tagDb, [upperCaseTags]));


server.listen(8000, () => { console.log('Listening on Port 8000'); });
