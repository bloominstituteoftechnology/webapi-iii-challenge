/***** Global Requires *****/
const express = require('express');

/***** Local Requires *****/
const postDB = require('./data/helpers/postDb');

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

server.use('/api/user', userRouter);
server.use('/api/post', postRouter)
/* Post CRUD Functions */
server.get('/posts', (req, res) => {
    
})

server.get('/posts/:id', (req, res) => {
    
})


server.listen(PORT, () => {
    console.log('Server is listening on port:', PORT);
})