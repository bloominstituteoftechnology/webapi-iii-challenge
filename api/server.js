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
server.use(morgan('short'));//does it matter what one we use at all?

//Server Code

server.get('/', (req, res) => {
    res.status(200).json({ api: 'it is running properly ' });
});

server.get('/users',(req,res)=>{
    res.status(200).json({})
});

// server.get('/secret', gatekeeper, (req, res) => {
//     res.send(req.welcomeMessage);
//   });   how he did it

module.exports=server;