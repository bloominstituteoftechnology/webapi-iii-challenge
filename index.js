// pull in express
const express = require('express');
const port = 9000;
const userRoutes = require("./users/userRoutes.js");
const postRoutes = require("./posts/postRoutes.js");
const configMiddleware = require("./config/middleware");



// create server/connect to express
const server = express();

server.use(express.json());

// middleware

configMiddleware(server);

// routes

server.use("/api/users", userRoutes);
server.use("/api/posts", postRoutes);




server.listen(port, () => {
    console.log(`---- Server Awake On ${port} ----`);
});