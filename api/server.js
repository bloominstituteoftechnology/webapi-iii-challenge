/* ======= IMPORTS ====== */
const express = require("express");
const postDb = require("../data/helpers/postDb");
const users = require("./users.js");

/* ======= SERVER CONFIG ====== */
const server = express();

/* ======= MIDDLEWARE ====== */
server.use(express.json());

server.get("/", (req, res) => {
  res.json({ Hello: "testing" });
});

server.use("/api/users/", users);

module.exports = server;
