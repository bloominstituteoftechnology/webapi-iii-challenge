// outside resources
const express = require("express");
const helmet = require("helmet");
const logger = require("morgan");

// custom files
const custMW = require("./middleware");
const usersRouter = require("./routers/usersRouter");
const postsRouter = require("./routers/postsRouter");

// local constants
const server = express();
const PORT = 4050;

// global middleware
server.use(express.json(), helmet(), logger("dev"));

// route handling
server.use("/users", usersRouter);
server.use("/posts", postsRouter);

// listen
server.listen(PORT, () => {
  console.log(`server is up and running on port ${PORT}`);
});
