const postDB = require('./data/helpers/postDb');
const userDB = require('./data/helpers/userDb');

const PORT = 9000;
const helmet = require('helmet');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors')

const userRoutes = require('./users/userRoutes.js');
const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan());
server.use(cors());

server.use('/users', userRoutes);

server.listen(PORT, () => console.log(`API on port ${PORT}`))