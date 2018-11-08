const express = require('express');
const userRouter = require("../user/userRouter.js");
const postRouter = require("../post/postRouter.js");
const server = express();

server.use(express.json());

server.get("/", (req, res) => {
    res.status(200).json({api: "running"})
})

// user endpoints
server.use('/api/users', userRouter);


// post endpoints
server.use('/api/posts', postRouter);

module.exports = server;