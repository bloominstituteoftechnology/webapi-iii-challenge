const express = require("express");

// custom middleware
// function logger( req, res, next) {
//     req.url = `${req.url}/1`;

//     next();
// }

// middleware
const helmet = require("helmet");
const morgan = require("morgan");
const server = express();
const userRouter = require("./subApps/userRouter.js");
const tagRouter = require("./subApps/tagRouter.js");
const postRouter = require("./subApps/postRouter.js");

//initializing port

server.use(helmet());
server.use(express());
server.use("/api/users", userRouter);
server.use("/api/tags", tagRouter);
server.use("/api/posts", postRouter);
// server.use(logger);

port = 5002;
server.listen(port, () => console.log("API running on port 5002!"));
