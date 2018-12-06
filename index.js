//imports
const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');
const postDb = require('./data/helpers/postDb');

const userRouter = require('./routers/user_router');
const postRouter = require('./routers/post_router');

const server = express();
const PORT = 3000;

//middleware
server.use(
  express.json(),
  logger('tiny'),
  helmet(),
);

//requests

server.use('/api/users', userRouter);

server.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`)
});