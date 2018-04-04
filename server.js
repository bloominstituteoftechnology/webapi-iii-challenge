const express = require("express");

// middleware
const helmet = require("helmet");
const morgan = require("morgan");
const server = express();
const userRouter = require("./endpoints/userRouter.js");
const tagRouter = require("./endpoints/tagRouter.js");
const postRouter = require("./endpoints/postRouter.js");

//initializing port

server.use(helmet());
server.use(express());
server.use("/api/users", userRouter);
server.use("/api/tags", tagRouter);
server.use("/api/posts", postROuter);
