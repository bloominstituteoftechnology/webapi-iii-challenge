const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const userRouter = require("./routers/userRouter.js");
const postRouter = require("./routers/postRouter.js");
const tagRouter = require("./routers/tagRouter.js");

const server = express();

// Custom MiddleWare

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
  console.log("Come at me Bro!");
});
