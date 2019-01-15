const express = require('express');
const helmet = require('helmet')
const logger = require('morgan');

const userRouter = require('./data/routers/userRouter')
const postRouter = require('./data/routers/postRouter')

const server = express();
const parser = express.json();
const PORT = 4000;

//Midleware
server.use(
  parser,
  helmet(),
  logger('dev')
);


//User Endpoints router
server.use('/api/users', userRouter)
//Post endpoints router
server.use('/api/posts/', postRouter)

//Listening 
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})