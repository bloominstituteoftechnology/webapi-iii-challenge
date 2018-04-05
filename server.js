const express = require('express');
const helment = require('helmet');
const cors = require('cors');

const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');
const tagRouter = require('./tags/tagRouter');

const server = express();

server.get("/", (req, res)=> {
    res.json({status:"API is running"});
})


server.use("/api/users",userRouter)
server.use("/api/posts",postRouter)
server.use("/api/tags",tagRouter)

const port = 5000;
server.listen(port,()=> console.log(`API is running ${port}`));


