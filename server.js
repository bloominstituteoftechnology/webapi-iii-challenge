const PORT = 9000;
const helmet = require('helmet');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors')

const userRoutes = require('./users/userRoutes.js');
const postRoutes = require('./posts/postRoutes.js');
const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan());
server.use(cors());

server.use('/users', userRoutes);
server.use('/posts', postRoutes);

server.listen(PORT, () => console.log(`API on port ${PORT}`))