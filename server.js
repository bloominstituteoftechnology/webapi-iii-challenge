const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const postRouter = require('./posts/postRouter.js');
const userRouter = require('./users/userRouter.js');

const server = express();


//FUNCTIONS
function logger(req, res, next){
  console.log(`${new Date().toISOString}`);
  next();
}  

//GLOBAL MIDDLEWARE
server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));
server.use(logger);
server.use(validateUserId);
server.use(validateUser);
server.use(validatePost);

//LOCAL
server.use('/api/post', postRouter);
server.use('/api/user', userRouter);


server.get('/', (req, res) => {
  res.send('<h1>Welcome to the Freak Show<h1>')
})

module.exports = server;
