const express = require('express');
const helmet = require('helmet');

const postRouter = require("./posts/postRouter")
const userRouter = require("./users/userRouter"
)
const server = express();

//custom middleware
function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get('host')}`);
  next();
 };

server.use(helmet());
server.use(logger);
server.use(express.json());

server.use("/api/posts", postRouter);
server.use("/api/users", userRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

module.exports = server;
