const express = require("express");
const usersRouter = require("./users/usersRouter");
const postsRouter = require("./posts/postsRouter");
const upperCase = require("./middleware/upperCase");

const server = express();

server.use(express.json());
// server.use(upperCase);

server.get("/", (req, res) => {
  res.send("Welcome!");
});

server.use("/api/users", usersRouter);
server.use("/api/posts", postsRouter);

server.listen(5000, () => console.log("API running on port 5000"));
