const express = require("express");
const server = express();
const cors = require("cors");

const port = process.env.PORT || 9000;
const postRouter = require("./posts/postRouter");
const userRouter = require("./users/userRouter");
const tagRouter = require("./tags/tagRouter");

server.use(express.json());
server.use(cors());

server.use("/posts", postRouter);
server.use("/users", userRouter);
server.use("/tags", tagRouter);

// R O O T
server.get("/", (req, res) => {
  res.status(200).send("<h1>THIS IS THE <em>root directory</em></h1>");
});

server.listen(port, () => console.log("server be runnin: port 9000"));
