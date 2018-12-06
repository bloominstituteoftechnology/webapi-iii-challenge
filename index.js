//dependencies 

const userDb = require('./data/helpers/userDb.js');
const express = require('express');
const middleware = require('./middleware.js');
const userRouter = require('./userRouter.js');

//define port and server

const PORT = 4001;
const server = express();

//use middleware

server.use(express.json(), middleware.capitalizeFirstLetter);

//use user router

server.use('/users', userRouter)

//initiate listening

server.listen(PORT, err => {
    console.log(`Server is running on ${PORT}`);
})
