const express = require("express");

const server = express();

const userRouter = require("./users/userRouter");
const postRouter = require("./posts/postRouter");

server.use(express.json());
server.use(logger);

server.use("/post/", postRouter);
server.use("/user/", userRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} ${req.url} ${Date.now()}`);
  next();
}

module.exports = server;
