const userRoutes = require('./users/userRoutes.js');
const postRoutes = require('./posts/postRoutes.js');

const express = require('express');

const server = express();

const logger = require('morgan');
const cors = require('cors');

server.use(logger('combined'));
server.use(cors());
server.use(express.json());

server.use('/users', userRoutes);
server.use('/posts', postRoutes);

server.get('/', (req, res) => {
    res.send('Howdy Pardner!');
});

const port = 9001;
server.listen(port, () => console.log(`The server is running on port ${port}, m'lady`));