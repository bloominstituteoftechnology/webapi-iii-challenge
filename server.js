const express = require('express');
const server = express();
//const morgan = require('morgan');
const helmet = require('helmet');

const usersRoutes = require('./routes/usersRoutes');
const postsRoutes = require('./routes/postsRoutes');
const tagsRoutes = require('./routes/tagsRoutes');

// Costum middleware
function logger(req, res, next) {
  next();
}

//server.use(morgan('dev'));
server.use(helmet());
server.use(express.json());
server.use(logger);

server.use('/api/users', usersRoutes);
server.use('/api/posts', postsRoutes);
server.use('/api/tags', tagsRoutes);

server.get('/', (req, res) => {
  res.send('Server is runnig...');
});

const port = 5000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
