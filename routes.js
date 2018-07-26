const userRoutes = require('./api/users');
const postRoutes = require('./api/posts');
const tagRoutes = require('./api/tags');

module.exports = app => {
  app.use('/api/users', userRoutes);
  app.use('/api/posts', postRoutes);
  app.use('/api/tags', tagRoutes);
};
