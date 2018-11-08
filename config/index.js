const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

const userRouter = require("../users");
const postRouter = require("../posts");

module.exports = server => {
  server.use(express.json());
  server.use(cors());
  server.use(helmet());
  server.use(logger("short"));
  server.use("/api/users", userRouter);
  server.use("/api/posts", postRouter);
};
