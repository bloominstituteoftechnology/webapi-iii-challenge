const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const server = express();

// routes
const postsRoutes = require("./routes/postsRoutes");
const usersRoutes = require("./routes/usersRoutes");

// middleware - global
server.use(express.json());
server.use(morgan("dev"));
server.use(helmet());
server.use(cors());


// routes - users
server.use("/", usersRoutes);
// routes - posts
server.use("/posts", postsRoutes);

module.exports = server;