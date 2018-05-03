const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const userRouter = require("../Node-Blog/data/router/userRouter.js");
const postRouter = require("../Node-Blog/data/router/userRouter.js");
const tagRouter = require("../Node-Blog/data/router/userRouter.js");

const server = express();

const logger = (req, res, next) => {
  console.log(`Requesting: ${req.url}`);
  console.log(`Body being passed: ${req.body}`);

  next();
};

server.use(express.json());
server.use(logger);
server.use(helmet());
server.use(cors());

server.use("/api/users", userRouter);
server.use("/api/posts", postRouter);
server.use("/api/tags", tagRouter);

const port = 5000;

server.listen(port, () => {
  console.log("Listening on Port 5000");
});