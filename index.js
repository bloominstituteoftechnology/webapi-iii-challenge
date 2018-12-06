const express = require('express');

const userRouter = require('./routers/user_router.js')
const postRouter = require('./routers/post_router.js')

const server = express();
const PORT = 4000;


server.use(express.json());
server.use('/post', postRouter);
server.use('/user', userRouter);


server.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}!`)
})