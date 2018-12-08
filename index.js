const express = require("express");
const server = express();
const userRouter = require("./routers/userRoutes.js");
const postRouter = require("./routers/postRoutes.js");

const helmet = require("helmet");
const logger = require("morgan");

const PORT = 5050;

server.use(express.json(), helmet(), logger("tiny"));

server.use("/users", userRouter);
server.use("/posts", postRouter);

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
