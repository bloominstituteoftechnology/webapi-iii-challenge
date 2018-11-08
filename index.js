//importing node modules
const express = require('express');

const userRouter = require('./users/userRouters');
const postRouter = require('./posts/postRouter');

//create server
const server=express();

//all methods attached to userdb
server.use('/api/users', userRouter);

//all methods attached to postdb
server.use('/api/posts', postRouter);

//set port for server to listen to
const port = process.env.PORT || 7000;
server.listen(port, ()=>console.log(`\nServer is listening on port ${port}\n`));