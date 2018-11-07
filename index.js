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

// edit user
server.put("/api/users/:id", (req, res) => {
  // const { id, body } = req.params;
  // console.log(req.body);
  userDb
    .update(req.params.id, req.body)
    .then(count => {
      if (count) {
        res.status(200).json(count);
      } else {
        res.status(404).json({ errorMessage: "user not found" });
      }
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "err" });
    });
});

// delete user
server.delete("/api/users/:id", (req, res) => {
  userDb
    .remove(req.params.id)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "error deleting user" });
    });
});

// server listen
server.listen(9000, () => console.log("Server is started"));
