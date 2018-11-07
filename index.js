// imports
const express = require("express");
const userDb = require("./data/helpers/userDb");
const postDb = require("./data/helpers/postDb");

// server config
const server = express();

server.get("/", (req, res) => {
  res.json({ Hello: "testing" });
});

server.use(express.json());

// get users
server.get("/api/users", (req, res) => {
  userDb.get().then(users => {
    res.status(200).json(users);
  });
});

// get by id
server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  userDb.get(id).then(users => {
    res.status(200).json(users);
  });
});

// post new user
server.post("/api/users/", (req, res) => {
  let newUser = req.body;
  console.log(newUser);

  if (!newUser.name) {
    res.status(400).json({ errorMessage: "Please add a Username" });
  } else {
    userDb.insert(newUser).then(user => {
      res.status(201).json(user.id);
    });
  }
});

// server listen
server.listen(9000, () => console.log("Server is started"));
