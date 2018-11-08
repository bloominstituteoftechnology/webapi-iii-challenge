//importing node modules
const express = require('express');

const userdb = require('./data/helpers/userDb');
const userRouter = require('./users/userRouters');
//create server
const server=express();

server.use(express.json());

//custom middleware to make sure POST and PUT requests have names properly capitalized
function nameCap(req, res, next) {
 //reassign the req's name value with one where all first letters have been capitalized
    req.body.name=req.body.name.toLowerCase().split(' ').map(word=>word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
 //then call the next middleware (in this example, the POST and PUT routehandlers)
    next();
}

//CRUD methods for userdb
server.use('/api/users', userRouter);

server.listen(7000, ()=>console.log('\nServer is listening on port 7000\n'));