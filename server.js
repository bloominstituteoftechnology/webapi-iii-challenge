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
server.use(express.json());

server.get("/", (req, res) => {
  res.send(`<h2>Hey...</h2>`);
});

module.exports = server;
