const express = require("express");
const server = express();

const logger = require("./custom/logger-middleware");
const userRouter = require("./users/userRouter");

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use(logger);
server.use(express.json());

server.use("/api/users", userRouter);

module.exports = server;
