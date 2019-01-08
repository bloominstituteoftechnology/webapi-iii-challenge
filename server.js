const express = require("express");
const cors = require("cors");

// const posts = require("./data/helpers/postDb");
const postRoutes = require("./posts/postRoutes");
// const users = require("./data/helpers/userDb");
const userRoutes = require("./users/userRoutes");

const server = express();
server.use(express.json());
server.use(cors({}));
server.use("/api/users", userRoutes);
server.use("/api/posts", postRoutes);

server.listen(5000, () => console.log("Server is listening on Port 5000"));
