const express = require('express');
const server = express();
const helmet = require('helmet');
const userRouter = require("./users/userRouter")
const postRouter = require("./posts/postRouter")

server.use(express.json());
server.use(helmet());
server.use(logger);

server.use("/api/users", userRouter);
server.use("/api/posts", postRouter);


server.get('/', logger, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});


function logger(req, res, next) {
  console.log(`${req.method} Request`);
  next();
}

module.exports = server;