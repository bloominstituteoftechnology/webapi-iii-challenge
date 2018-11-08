const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

const userRouter = require("./users");
const postRouter = require("./posts");

const server = express();
server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(logger("short"));
server.use("/api/users", userRouter);
server.use("/api/posts", postRouter);
const port = 9000;

server.listen(port, () => {
  console.log(`\n=== Listening on port ${port} ===\n`);
});
