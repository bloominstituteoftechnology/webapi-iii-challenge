const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const postDB = require("../data/helpers/postDb");

const server = express();

//middleware
server.use(express.json());
server.use(helmet());
server.use(morgan("dev"));
server.use(cors({ origin: "http://localhost:3000" }));

//endpoints
server.get("/api/posts", (req, res) => {
  postDB
    .get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({ message: "the post info could not be received" });
    });
});

module.exports = server;
