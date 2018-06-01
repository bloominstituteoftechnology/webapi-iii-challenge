const express = require("express");
const cors = require("cors");

const users = require("./Routers/users");
const posts = require('./Routers/posts');
const tags = require('./Routers/tags');

const server = express();
const port = 6666;

server.use(express.json());
server.use(cors());

server.use("/users", users);
server.use("/posts",posts)
server.use("/tags",tags)

server.listen(port, () => console.log("Server running on port %s ", port));
