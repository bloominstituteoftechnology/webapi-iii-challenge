const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');

const postsRouter = require('./posts/postRouter.js')

const server = express();

//GLOBAL MIDDLEWARE

//built in middleware
server.use(express.json());

//third party middleware
server.use(helmet());
server.use(logger('dev'));

//custom middleware
server.use(typeLogger)


//router
server.use('/api/posts', postsRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});



function typeLogger(req, res, next) {
    console.log(`${req.method} Request`);
    next();
};

module.exports = server;
