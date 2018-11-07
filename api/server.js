const express = require("express");
const userDB = require("../data/helpers/userDb");
const server = express();
const upperCaseThat= require('./toUpperMiddleware');
server.use(express.json());
server.get("/", (req, res) => {
  res.status(200).json({ api: "running" });
});
server.get("/api/users", (req, res) => {
  userDB
    .get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json({ message: "Cant not fetch" });
    });
});
server.get("api/users/:id", (req, res) => {
  const { id } = req.params;
  userDB
    .get(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      res.status(500).json({ messsage: "cant fetch" });
    });
});
server.post("/api/users",upperCaseThat, async (req, res) => {
  console.log("body", req.body);
  try {
    const userData = req.body;
    const userId = await userDB.insert(userData);
    const user = await userDB.get(userId.id);
    res.status(201).json(user);
  } catch (error) {
    let message = "error creating the user";
    if (error.errno === 19) {
      message = "please provide every required thing";
    }
    res.status(500).json({ message, error });
  }
});
server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  userDB
    .update(id, changes)
    .then(count => {
      if (count) {
        res.status(200).json({ message: `${count} users updated` });
      } else {
        res.status(404).json({ message: "user not found" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "error updating the user" });
    });
});
server.delete("/api/users/:id", (req, res) => {
  userDB
    .remove(req.params.id)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(error => {
      res.status(500).json({ message: "error deleteing user" });
    });
});
module.exports = server;
