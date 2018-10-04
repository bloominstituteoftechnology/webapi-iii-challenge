const express = require('express'); 
const helmet = require('helmet'); 
const db = require('../data/helpers/postDb')

const server = express();

server.use(helmet());
server.use(express.json());


const yell = (req,res,next) => {
req.body.name = req.body.name.toUpperCase();
next();
};

