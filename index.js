const middleware = require('./customMiddleware.js');
const userRouter = require('./routers/user_router.js');
const postRouter = require('./routers/post_router.js');
const express = require('express');
const cors = require('cors');

const server = express();
const PORT = 9000;

// Middleware

server.use(
    express.json(),
    middleware.upperCase
)

server.use('/users', userRouter);
server.use('/posts', postRouter);

// Listen

server.listen(PORT, () => {
    console.log(`Server is alive and well at port ${PORT}`)
});