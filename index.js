//Modules require 
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan')
const server = express();
const postsRouter = require('./Router/posts_router');
const usersRouter = require('./Router/users_router');

const PORT = 5050;

server.use(
            helmet(),
            morgan('dev'),
          );
server.use('/api/posts',postsRouter);
server.use('/api/users', usersRouter);

//listen
server.listen(PORT, () =>{
  console.log(`Server running on port ${PORT}`)
})