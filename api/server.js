const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const upperCase = require("../upperCase/upperCase.js");
const postDb = require('../data/helpers/postDb');
const userDb = require('../data/helpers/userDb');

const server = express();

//Middleware Stuffage
server.use(express.json());
server.use(helmet()); 
server.use(morgan('dev'));//does it matter what one we use at all?

//Server Code

server.get('/', (req, res) => {
    res.status(200).json({ api: 'it is running properly ' });
});

//users .gets 
server.get('/users',(req,res)=>{
    userDb.get()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(error => {
            res.status(500).json("can not find the users ",error)
        })
});

//posts .gets
server.get('/posts',(req,res)=>{
    postDb.get()
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(error => {
            res.status(500).json("can not find the posts ",error)
        })
});

// server.get('/secret', gatekeeper, (req, res) => {
//     res.send(req.welcomeMessage);
//   });   how he did it

module.exports=server;