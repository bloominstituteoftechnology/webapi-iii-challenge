const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const server = express();
const logger = require("./middleware/logger.js");
const userRouter = require("./users/userRouter");
const postRouter = require("./posts/postRouter");

//global middleware
server.use(helmet());
server.use(express.json());
// server.use(dateLogger);
server.use(logger);
server.use(morgan("server"));

server.use("/api/users", userRouter);
server.use("/api/posts", postRouter);

server.get("/", (req, res) => {
  const nameInsert = req.name ? `${req.name}` : "";
  res.send(`
      <h1>Welcome ${nameInsert} to user/posts!</h1>
      `);
});

//custom middleware

// function dateLogger(req, res, next) {
//   console.log(new Date().toISOString());

//   next();
// }

module.exports = server;
