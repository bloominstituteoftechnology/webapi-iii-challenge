// pull in express
const express = require('express');
const port = 9000;
const userRoutes = require("./users/userRoutes.js");
const configMiddleware = require("./config/middleware");

// create server/connect to express
const server = express();

server.use(express.json());

// middleware

configMiddleware(server);


server.use("/api/users", userRoutes);




server.listen(port, () => {
    console.log(`---- Server Awake On ${port} ----`);
});