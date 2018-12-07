const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');
const customMW = require('./customMW')

const userRouter = require('./routers/user_router');
const postRouter = require('./routers/post_router')
const server = express();

const PORT = 4000;

server.use(
    express.json(),
    helmet(),
    logger('dev'),
    // customMW.uppercaser
);

server.use('/api/users', userRouter)
server.use('/api/posts', postRouter)

server.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`)
})