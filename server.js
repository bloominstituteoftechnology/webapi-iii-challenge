const express = require('express');

const usersRoutes = require('./users/usersRoutes.js');
const postRoutes = require('./post/postRoutes.js');
const tagsRoutes = require('./tags/tagRoutes.js');

const server = express();

server.use(express.json());
server.use('/api/users', usersRoutes);
server.use('/api/posts', postRoutes);
server.use('/api/tags', tagsRoutes);

const port = 5000;

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
