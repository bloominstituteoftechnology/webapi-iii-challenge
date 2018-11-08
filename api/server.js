/* ======= IMPORTS ====== */
const express = require("express");
const users = require("./users.js");
const posts = require("./posts.js");

/* ======= SERVER CONFIG ====== */
const server = express();

/* ======= MIDDLEWARE ====== */
server.use(express.json());

/* ======= ROOT ====== */
server.get("/", (req, res) => {
  res.json({ Hello: "testing" });
});

/* ======= POSTS ROUTE ====== */
server.use("/api/posts/", posts);

/* ======= USERS ROUTE ====== */
server.use("/api/users/", users);

module.exports = server;
