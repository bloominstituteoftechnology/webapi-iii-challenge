const express = require("express");
const server = express();
const userRouter = require("./users/userRouter");
const postRouter = require("./posts/postRouter");
const middleware = [
  express.json(),
  logger,
  validateUserId,
  validateUser,
  validatePost
];
server.use(middleware);
server.use("/api/users", userRouter);
server.use("/api/posts", postRouter);

module.exports = server;
