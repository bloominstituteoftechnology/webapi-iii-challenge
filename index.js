const express = require("express");
const server = express();
// databases
const userRoutes = require("./users/userRoutes.js");
const postRoutes = require("./posts/postRoutes.js");

// causes express middleware
// stack to be added to every layer (request function)
server.use(express.json());

// must be used when using express Router
// links url with requests
server.use("/users", userRoutes);
server.use("/posts", postRoutes);

server.listen(8000, () => console.log("\n== API on port 8k ==\n"));
