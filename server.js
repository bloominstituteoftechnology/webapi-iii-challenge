const express = "express";
const helmet = require("helmet");
const server = express();

server.get("/", (req, res) => {
  const nameInsert = req.name ? `${req.name}` : "";
  res.send(`
      <h1>Welcome ${nameInsert} to user/posts!</h1>
      `);
});

// const userRouter = require("./routes/userRouter");
// const postRouter = require("./posts/postRouter");

// server.use("./api-users", userRouter);
// server.use("./api-posts", postRouter);

function dateLogger(req, res, next) {
  console.log(new Date().toISOString());

  next();
}

function logger(req, res, next) {
  console.log(`${req.method} to ${req.url}`);

  next();
}

//global middleware
server.use(helmet());
server.use(express.json());
server.use(dateLogger);
server.use(logger);

//custom middleware

module.exports = server;
