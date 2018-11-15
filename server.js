const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

const server = express();
server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));
server.use(cors());

const userRoute = require('./routes/userRoute');
const postRoute = require('./routes/postRoute')
const tagRoute = require('./routes/tagRoute');

server.use('/users', userRoute);
server.use('/posts', postRoute)
server.use('/tags', tagRoute),

server.get('', (req, res) => {
  res.json({ message: 'Hey there!'})
})
module.exports = server;
