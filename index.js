const express = require("express");
const server = express();
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

const userRoutes = require("./userRoutes");
const postRoutes = require("./postRoutes");

server.use(express.json());
server.use("/users", userRoutes);
server.use("/posts", postRoutes);
server.use(helmet())
server.use(cors())
server.use(morgan("dev"))

const port = 8000;

server.listen(port, err => {
  console.log(`\n=== The server is up and running on ${port} ===\n`);
});
