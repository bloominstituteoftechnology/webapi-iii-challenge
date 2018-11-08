const express = require("express");
const usersRouter = require("./users/usersRouter");
const postsRouter = require("./posts/postsRouter");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send("Welcome!");
});

server.use("/api/users", usersRouter);
server.use("/api/posts", postsRouter);

const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`API running on port ${port}`));
