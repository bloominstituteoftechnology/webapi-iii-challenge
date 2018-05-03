const express = require('express');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const tagRoutes = require('./routes/tagRoutes');

const server = express();
server.listen(5000, () => console.log('\nServer listening on port 5000\n'));
server.use(express.json());
// future reference, this is for x-www-form-urlendcoded form data
// server.use(express.urlencoded({ extended: true }));

server.use('/api/users', userRoutes);
server.use('/api/posts', postRoutes);
server.use('/api/tags', tagRoutes);

const errorLog = (err, req, res, next) => {
  console.log(err);
  res.status(500).json(err);
}

server.use(errorLog);
