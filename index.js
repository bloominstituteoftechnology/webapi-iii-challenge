const express = require("express");

const configureMiddleware = require("./config/middleware.js");
const userRoute = require("./users/userRoute.js");
const postRoute = require("./posts/postRoute.js");

// Server
const server = express();
const PORT = 3000;

// Middleware
configureMiddleware(server);

server.use("/api/posts", postRoute);
server.use("/api/users", userRoute);

// Custom middleware
const upperCase = (req, res, next) => {
  req.body.name = req.body.name.toUpperCase();
  next();
};

server.get("/", (req, res) => {
  res.send("Blog...");
});

// Listen
server.listen(PORT, () => console.log(`Server started on port ${PORT}...`));
