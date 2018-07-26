const express = require('express');
const server = express();
const morgan = require('morgan')
const helmet = require('helmet');

const postRoutes = require('./routes/postRoutes');
const tagRoutes = require('./routes/tagRoutes');
const userRoutes = require('./routes/userRoutes');

server.use(express.json());
server.use(morgan('dev'));
server.use(helmet());

server.use('/posts', postRoutes);
server.use('/tags', tagRoutes);
server.use('/users', userRoutes);
//server.use('/', (req, res) => res.send('API up and running!'));

server.listen(8000, () => console.log('API running on port 8000'));
