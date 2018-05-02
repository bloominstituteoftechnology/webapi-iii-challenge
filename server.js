const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

// import db from ./data/<whateverDb required> through route
const userRoutes = require("./router/userRoutes");
// const postRoutes = require("./router/postRoutes");
// const tagRoutes = require("./router/tagRoutes");

const server = express();

function logger(req, res, next) {
  return function(req, res, next) {
    console.log(`\n= Requesting: ${req.url}`);
    next();
  };
}

function errorHandler(err, req, res, next) {
  if (err) {
    if (err.errno === 19) {
      res.status(400).json({ msg: "Plase provide all required fields" });
    } else {
      res.status(500).json({ error: "something bad happened" });
    }
  }
}

// middlware
server.use(logger("loading..."));
server.use(helmet());
server.use(express.json());
server.use(cors());

// route handlers
server.use("/api/users", userRoutes);
// server.use("/api/posts", postRoutes);
// server.use("/api/tags", tagRoutes);

server.get("/", (req, res) => {
  res.send("API is running");
});

// error handler
server.use(errorHandler);

// server port
server.listen(5000, () => console.log(`\n== API is running on port 5000 \n`));
