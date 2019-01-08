const express = require("express");
const cors = require("cors");

const postRoutes = require("./posts/postRoutes");
const userRoutes = require("./users/userRoutes");

const server = express();
const port = 5000;

server.use(express.json());
server.use(cors({}));
server.use("/api/users", userRoutes);
server.use("/api/posts", postRoutes);

server.listen(port, () => console.log(`Server is listening on Port ${port}`));
