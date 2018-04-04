const express = require("express");

const server = express();

const db = require("./data/dbConfig.js");

const userRouter = require("./users/userRouter.js");
const postRouter = require("./posts/postRouter.js");

server.use("/api/users/:userId/posts/", postRouter);
server.use("/api/users", userRouter);

const port = 5000;
server.listen(port, () => {
  console.log("API Running");
});
