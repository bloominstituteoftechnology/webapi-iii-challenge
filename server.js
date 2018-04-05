const express = require('express');
const userRouter = require('./data/user/userRouter.js');


const db = require('./data/dbConfig.js');

const server = express();


server.use(express.json());
server.use('/api/users', userRouter);


// server.get()


const port = 5000;
server.listen(port, () => console.log('API running on port 5000'));