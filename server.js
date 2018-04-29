const express = require('express');

const userRouter = require('./data/user/userRouter.js');
const postRouter = require('./data/post/postRouter.js');


const server = express();


server.use(express.json());
server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);




const port = 5000;
server.listen(port, () => console.log('API running on port 5000'));