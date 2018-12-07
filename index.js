/***** Global Requires *****/
const express = require('express');

const userRouter = require('./routers/user_router');
const postRouter = require('./routers/post_router');

/* Global variables */
const server = express();
const PORT = 4000;

server.use(express.json());

// Custom middleware
server.use((req, res, next) => {
    if(req.body.name !== undefined) {
        req.body.name = req.body.name.toUpperCase();
        next();
    }
    else {
        next();
    }
})

server.use('/api/users', userRouter);
server.use('/api/posts', postRouter)

server.listen(PORT, () => {
    console.log('Server is listening on port:', PORT);
})