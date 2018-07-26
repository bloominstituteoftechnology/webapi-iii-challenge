const codes = require("./status-codes/statusCodes");


const express = require("express");

const userRoutes = require("./api/userRoutes");
const postRoutes = require("./api/postRoutes");

const server = express();

server.use(express.json());

server.use("/api/users", userRoutes);
server.use("/api/posts", postRoutes);

server.use((err, req, res, next) => {
  const errorInfo = {
    ...err,
    success: false
  };
  switch (errorInfo.code) {
    case codes.BAD_REQUEST:
      res.status(codes.BAD_REQUEST).json(errorInfo);
      return;
    case codes.NOT_FOUND:
      res.status(codes.NOT_FOUND).json(errorInfo);
      return;
    case codes.INTERNAL_SERVER_ERROR:
      res.status(codes.INTERNAL_SERVER_ERROR).json(errorInfo);
      return;
    default:
      res.status(codes.INTERNAL_SERVER_ERROR).json(errorInfo);
  }
});

server.listen(8001);
