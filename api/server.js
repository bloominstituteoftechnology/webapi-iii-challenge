const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

const server = express();

// database
const userDb = require("../data/helpers/userDb");
const postDb = require("../data/helpers/postDb");
const tagDb = require("../data/helpers/tagDb");

// middleware - global
server.use(express.json());
server.use(morgan("short"));
server.use(cors());

// routes
server.get("/api/users", async (req, res) => {
  try {
    const userList = await userDb.get();
    res.json(userList);
  } catch (err) {
    res.status(500).json({ message: `the user list cannot be retrieved` });
  }
});

module.exports = server;
