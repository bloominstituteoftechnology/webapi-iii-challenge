const express = require("express");

const configureMiddleware = require("./config/middleware.js");
const usersRoute = require("./users/usersRoute.js");
const postRoute = require("./posts/postRoute.js");

// Server
const server = express();
const PORT = 3000;

// Middleware
configureMiddleware(server);

server.listen(PORT, () => console.log(`Server started on port ${PORT}...`));
