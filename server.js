const express = require("express");
const server = express();
const userRouter = require("./routers/userRouter.js");
const postRouter = require("./routers/postRouter");

const parser = express.json();

server.use(parser);
server.use("/user", userRouter);
server.use("/post", postRouter);

module.exports = server;
