const usersRouter = require('../users/usersRouter');
const postsRouter = require('../posts/postsRouter')

module.exports = server => {
    server.use('/api/users', usersRouter);
    server.use('/api/posts', postsRouter);
}