const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const userRouter = require("./Routers/userRouter");
const postRouter = require("./Routers/postRouter");
const tagRouter = require("./Routers/tagRouter");

const server = express();

function logger(req, res, next) {
  console.log(`requesting: ${req.url}`);

  next();
}

server.use(logger);
server.use(cors());
server.use(helmet());
server.use(express.json());

server.use("/api/users", userRouter);
server.use("/api/posts", postRouter);
server.use("/api/tags", tagRouter);

server.get("/", function(req, res) {
  res.send({ api: "Running..." });
});

const port = 5000;
server.listen(port, () => console.log("API Running on port 5000"));
