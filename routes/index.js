const routes = require('express').Router();
const posts = require('./posts');
const tags = require('./tags');
const users = require('./users');

routes.use('/api/posts', posts);
routes.use('/api/tags', tags);
routes.use('/api/users', users);

routes.get('/', (req, res) => {
  res.status(200).send('Node Blog API');
});

module.exports = routes;

