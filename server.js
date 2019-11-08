const express = require("express");
const userRouter = require("./users/userRouter");
const postRouter = require("./posts/postRouter");

const server = express();

server.use(express.json());
server.use(logger);
server.use("/api/users", userRouter);
server.use("/api/posts", postRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Jashele Tillman</h2>`);
});

// logger logs to the console the following information about each request: request method, request url, and a timestamp
// this middleware runs on every request made to the API

function logger(req, res, next) {
  console.log(`
  ${req.method}
  ${req.url}
  ${req.get("host")}
}`);
  next();
}

module.exports = server;
