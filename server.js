const express = require('express');
const server = express();
const helmet = require ('helmet');
const logger = require('morgan');
const userRouter = require("./users/userRouter")
const postRouter = require("./posts/postRouter")

server.use(express.json());
server.use(helmet());
server.use(logger('dev'))

server.use("/api/users", userRouter);
server.use("/api/posts", postRouter);


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});






module.exports = server;
