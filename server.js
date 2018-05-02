const express = require('express');
const cors = require('cors');
// const helmet require('helmet');
const server = express();

const usersRoute = require('./users/userRoutes');
server.use(express.json());
server.use(cors());

server.use(express.json());
server.use(cors());
// server.use(helmet());
server.use('/api/users', usersRoute);
server.listen(3500, console.log('Listening'));