const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");

const server = express();

const db = require("./data/dbConfig.js");

const userRouter = require("./users/userRouter.js");
const postRouter = require("./posts/postRouter.js");
const tagRouter = require("./tags/tagRouter.js");

function toUpperCase(req, res, next) {
  console.log("In middleware: ", req.body);
  if (req.body.tag) {
    req.body.tag = req.body.tag.toUpperCase();
  }

  next();
}

server.use(helmet());
server.use(express.json());
server.use(morgan());
server.use(toUpperCase);

server.use("/api/posts/", postRouter);
server.use("/api/users/", userRouter);
server.use("/api/tags/", tagRouter);

const port = 5000;
server.listen(port, () => {
  console.log("API Running");
});
