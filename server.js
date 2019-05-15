const express = 'express';

const server = express();
const helmet = require("helmet");
const morgan = require("morgan");

const postsRouter = require("./posts/postsRouter.js");
const usersRouter = require("./users/userRouter")

server.use(express.json());
server.use(helmet());
server.use(morgan("dev"));

server.get('/', (req, res) => {
  res.send(`<h2>THIS IS HOW WE POST</h2>`)
});

server.use("/api/post", postsRouter);
server.use("/api/users", usersRouter);

module.exports = server;
