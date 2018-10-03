const express=require('express');
const server=express();

const configMiddleware=require('./config/middleware.js')(server);

const users=require('./users/userRoutes.js');
const posts=require('./posts/userRoutes.js');

server.use('/users',users);
server.use('/posts',posts);

server.listen(9000,()=>console.log('Engines firing server starting new horizons venturing.'))