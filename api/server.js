//https://github.com/LambdaSchool/Node-Blog/pull/360

const express = require('express');
const userRouter = require('../users/userRouter.js');
const postRouter = require('../post/postRouter.js');

const server = express();

server.use(express.json());

// custom middleware
const pascalcase = (req, res, next) => {
    let name = req.body.name;
    name = name.split('');
    name[0] = name[0].toUpperCase();
    name = name.join('')
    req.body.name = name;
    next();
}

//posts
server.use('/api/posts', postRouter );

//users
server.use('/api/users', userRouter );


module.exports = server;