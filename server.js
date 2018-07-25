const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');


const posts = require('./routes/posts')
const users = require('./routes/users')
const tags = require('./routes/tags')



const tagDb = require('./data/helpers/tagDb');
const userDb = require('./data/helpers/userDb');

const server = express();
server.use(helmet());
server.use(morgan('dev'));
server.use(express.json());

server.use('/api/posts', posts);
// server.use('/users', users)
// server.use('/tags', tags)


server.listen(8000, () => { console.log('Listening on Port 8000')});
