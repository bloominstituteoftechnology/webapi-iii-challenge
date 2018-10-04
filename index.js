// imports
const express = require("express");
const logger = require("morgan");
const configureMiddleware = require("./config/middleware.js");
const userRoutes = require("./users/userRoutes.js");
const postRoutes = require("./posts/postRoutes");

// setup server
const server = express();
const port = 8000;
server.use(logger("combined"));
configureMiddleware(server);

// ROUTES
// Homepage
server.get("/", (req, res) => {
  res.send("Hello World");
});

server.use("/users", userRoutes);
server.use("/posts", postRoutes);

// call server.listen
server.listen(port, () => {
  console.log(`listening on ${port}`);
});
