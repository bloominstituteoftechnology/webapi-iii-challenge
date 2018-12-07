const express = require('express');
const morgan = require('morgan');

const user = require('./routes/user');
const post = require('./routes/post');
const upperCase = require('./middleware');

const server = express();
const PORT = 3000;

server.use(express.json());
server.use(morgan('dev'));

server.use(upperCase);

server.use('/users', user);
server.use('/posts', post);


server.listen(PORT, err => {
    console.log(`Server listening on port ${PORT}`);
});