const usersRouter = require('../users/usersRouter');
const postsRouter = require('../posts/postsRouter');

const users = server => {
  server.use('/api/users', usersRouter);
};

const posts = server => {
  server.use('/api/posts', postsRouter);
};

module.exports = {
  usersRouter: users,
  postsRouter: posts
};