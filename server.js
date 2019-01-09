const express = require("express");
const cors = require("cors");

const postRoutes = require("./posts/postRoutes");
const userRoutes = require("./users/userRoutes");

const server = express();

server.use(express.json());
server.use(cors());
server.use("/api/users", userRoutes);
server.use("/api/posts", postRoutes);

module.exports = server;
