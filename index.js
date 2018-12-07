const express = require('express');
const server = express();
const PORT = 5050;
const helmet = require('helmet');
const morgan = require('morgan');
const capitalize = require('./middleware.js');
const postRouter = require('./post_router');
const userRouter = require('./user_router');

server.use(
  express.json(),
  morgan('tiny'),
  helmet()
)

server.use(capitalize);
server.use('/api/posts', postRouter);
server.use('api/users', userRouter);




server.listen(PORT,() => {
  console.log(`Server is listenening on port ${PORT}`)
});