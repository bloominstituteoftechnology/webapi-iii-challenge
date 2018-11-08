const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

const userDB = require("../data/helpers/userDb.js");
const server = express();

server.use(helmet());
server.use(morgan("dev"));
server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "running" });
});

server.get("/users", (req, res) => {
  userDB
    .get()
    .then(users => {
      console.log(users);
      res.status(200).json(users);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "we failed you, can't get the users", error: err });
      console.error(err);
    });
});

// server.post("/users", async (req, res) => {
//   console.log("body", req.body);
//   try {
//     res.status(201).json(await userDB.insert(req.body));
//   } catch (error) {
//     let message = "error creating the user";

//     res.status(500).json({ message, error });
//   }
// });

server.post("/users", (req, res) => {
  userDB
    .insert(req.body)
    .then(userId => {
      console.log(userId);
      res.status(200).json(userId);
    })
    .catch(err => {
      res.status(500).json(err);
      console.error(err);
    });
});

module.exports = server;
