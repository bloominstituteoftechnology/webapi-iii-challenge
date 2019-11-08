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

server.get('/', (req, res, next) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';
  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

module.exports = server;
