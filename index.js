const express = require("express");

// middle ware pull-ins
const cors = require("cors"); // port-to-port interaction
const logger = require("morgan"); // http request logger
const helmet = require("helmet"); // encrypt res header...
const userRouter = require('./userRouter');
const postRouter = require('./postRouter');
// server helper functions
const userdb = require("./data/helpers/userDb");
const postdb = require("./data/helpers/postDb");

// init server
const server = express();

// middleware usage
server.use(
  express.json(),
  cors(),
  logger(":method :url :status :response-time ms"),
  helmet()
);
server.use('/users', userRouter);
server.use('/posts', postRouter);

// route handlers

/* ======= USER ROUTES ======= */
server.get("/", (req, res) => {
  res.send(`
    <h1>Root Page</h1>
    <li><a href="http://localhost:${process.env.PORT}/users">All Users</a></li>
    <li><a href="http://localhost:${process.env.PORT}/posts">All Posts</a></li>
  `);
});

// route handler listner
server.listen(process.env.PORT, () => console.log(`Port:${process.env.PORT}`));
