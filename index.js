const express = require("express");
const server = express();
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const userRouter = require("./routers/userRouter");
const postRouter = require("./routers/postRouter");
const tagRouter = require("./routers/tagRouter");

const PORT = process.env.PORT || 4000;

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(morgan("dev"));

server.use("/api/users", userRouter);
server.use("/api/posts", postRouter);
server.use("/api/tags", tagRouter);

server.listen(PORT, err => {
  console.log(`server is now running on port ${PORT}`);
});
