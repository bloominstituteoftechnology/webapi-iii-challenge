const express = require("express");
const userRouter = require("./users/userRouter");
const postRouter = require("./posts/postRouter");

const server = express();

server.use(express.json());
server.use(logger);
server.use("/api/users", userRouter);
server.use("/api/posts", postRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Jashele Tillman</h2>`);
});

//----------------------------------------------------------------------------//
// LOGGER middleware: logs request method, request url, and a timestamp
//----------------------------------------------------------------------------//

function logger(req, res, next) {
  console.log(`
  ${req.method}
  ${req.url}
  ${req.get("host")}
}`);
  next();
}

module.exports = server;
