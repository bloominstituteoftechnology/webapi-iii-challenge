
const express = require('express'); 
const server =  express(); 
const userRouter = require('./Routes/UserRoutes.js');
const postRouter = require('./Routes/PostRoutes.js');
const postDb = require('./data/helpers/postDb.js'); 


server.use(express.json());

server.use('/api/users', userRouter); 
server.use('/api/posts', postRouter); 

server.listen(5000); 