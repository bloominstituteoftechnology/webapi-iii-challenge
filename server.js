const express = require('express');
const logger = require('morgan'); 
const helmet = require('helmet');

const userRoute = require('./data/userRouter.js');
//const postRoute = require('./data/postRouter.js');

const server = express();

server.use(express.json(), logger('dev'), helmet());
server.use('/api/user', userRoute);
//server.use('/api/post', postRoute);


server.get('/', (req, res) => {
  res.send(`<h2>Lambda Blog API</h2>`);
});

module.exports = server;