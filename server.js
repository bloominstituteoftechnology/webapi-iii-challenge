const express = require("express");

const cors= require('cors');

const helmet = require('helmet');


const postRouter =require('./postRouters/postRouter.js');
const tagRouter = require('./tagRouter/tagRouter.js');
const userRouter = require('./userRouter/userRouter.js')

const server = express();

function tagUppercase (req, res, next){
    if (req.body.tag=== true){
        req.body.tag= req.body.tag.toUpperCase();
    } 
    next();
}

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(tagUppercase);

server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);
server.use('/api/tags', tagRouter);

server.get("/", function(req,res){
    res.json({api:'running'});
});


const port = 5000;
server.listen(port, () => console.log("API running on port 5000"));
