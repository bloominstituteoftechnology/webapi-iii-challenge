const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");

const server = express();

const db = require("./data/dbConfig.js");

const userRouter = require("./users/userRouter.js");
const postRouter = require("./posts/postRouter.js");
const tagRouter = require("./tags/tagRouter.js");

server.use(express.json());
server.use(helmet());
server.use(morgan());

server.use("/api/posts/", postRouter);
server.use("/api/users", userRouter);
server.use("/api/tags", tagRouter);

const port = 5000;
server.listen(port, () => {
  console.log("API Running");
});
