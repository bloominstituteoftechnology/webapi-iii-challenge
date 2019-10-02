// const express = 'express';
const express = require("express");

const server = express();

const userRouter = require("./users/userRouter.js");

const postRouter = require("./posts/postRouter.js");

server.use(express.json());
server.use(logger);

server.use("/users", userRouter);
server.use("/posts", postRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware, we get info about who is working with server, new date,
// time stamp fo when, req method, and what url and end point was used, and
//the origin of the user request

// next tells us to move to next argument

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
      "host"
    )}`
  );
  next();
}

module.exports = server;
