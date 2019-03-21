const express = require("express");
const cors = require("cors");

const usersRouter = require("./users-router");
const postsRouter = require("./posts-router");

const server = express();

server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
  try {
    const myMessage =
      process.env.ENVARSUPPORT || "Environment support from env did not work";
    res
      .status(200)
      .json({
        myEnvMessage: myMessage,
        otherMessage:
          "Navigate to /api/users on the URL to get all the users then all their posts from /api/users/posts"
      });
  } catch (error) {
    console.error("\nERROR", error);
    res.status(500).json({ error: "Cannot retrieve the shoutouts" });
  }
  // res.send(
  //   "Navigate to /api/users on the URL to get all the users then all their posts from /api/users/posts", "myMessage" myMessage
  // );
});

server.use("/api/users", usersRouter);

server.use("/api/posts", postsRouter);

module.exports = server;
