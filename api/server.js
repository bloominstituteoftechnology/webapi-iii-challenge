const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

const userDB = require("./data/helpers/userDb.js");
const server = express();

server.use(helmet());
server.use(morgan("dev"));

server.get("/", (req, res) => {
  res.status(200).json({ api: "running" });
});

server.get("/users", (req, res) => {
  userDB
    .find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "we failed you, can't get the users", error: err });
    });
});

server.post("/api/users", async (req, res) => {
  console.log("body", req.body);
  try {
    const userData = req.body;
    const userId = await db.insert(userData);
    const user = await db.findById(userId.id);
    res.status(201).json(user);
  } catch (error) {
    let message = "error creating the user";

    if (error.errno === 19) {
      message = "please provide both the name and the bio";
    }

    res.status(500).json({ message, error });
  }
});

module.exports = server;
