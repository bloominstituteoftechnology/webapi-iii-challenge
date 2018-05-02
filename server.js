// Node Modules
const postDb = require("./data/helpers/postDb");
const tagDb = require("./data/helpers/tagDb");
const userDb = require("./data/helpers/userDb");

const express = require("express");
const cors = require("cors");

const server = express();

server.use(express.json());
server.use(cors());

// Server running
server.get("/", (req, res) => {
  res.send("API is running!");
});


