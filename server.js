const express = require("express");
const userRouter = require("./users/userRouter");
const postRouter = require("./posts/postRouter");

const server = express();
server.use(express.json());

server.use("/posts", postRouter);
server.use("/users", userRouter);
server.use(logger);

server.get("/", (req, res) => {
  res.status(200).send(`<h2>Let's write some middleware!</h2>`);
});

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
      "Origin"
    )}`
  );
  next();
}

module.exports = server;