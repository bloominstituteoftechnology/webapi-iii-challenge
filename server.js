const express = require("express");
const postRouter = require("./posts/postRouter");
const userRouter = require("./users/userRouter");

const server = express();

//setup global middleware
server.use(logger);
server.use(express.json());

server.use("/posts", postRouter);
server.use("/users", userRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} ${req.url} ${new Date().toISOString()}`);

  next();
}

module.exports = server;
