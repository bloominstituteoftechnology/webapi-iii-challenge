const express = require("express");
const upperCase = require("./upperCase");
const userDB = require("./data/helpers/userDb");

const server = express();
server.use(express.json());
server.use(upperCase.uppercase);

server.get("/users", async (req, res) => {
  try {
    const results = await userDB.get();
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json(err);
  }
});

server.get("/users/:id", async (req, res) => {
  if (!Number(req.params.id)) {
    res.status(400).json({ message: "Please enter a number" });
  }
  try {
    const results = await userDB.get(Number(req.params.id));
    if (results) {
      res.status(200).json(results);
    }
    res.status(500).json({ message: "Your Id is invalid" });
  } catch (err) {
    res.status(500).json(err);
  }
});

server.delete("/users/:id", async (req, res) => {
  if (!Number(req.params.id)) {
    res.status(400).json({ message: "Please enter a number" });
  }
  try {
    const results = await userDB.remove(Number(req.params.id));
    if (results === 1) {
      res.status(200).json({ message: "Success" });
    }
    res.status(500).json({ message: "Invalid Id" });
  } catch (err) {
    res.status(500).json(err);
  }
});

server.put("/users", async (req, res) => {
  if (!req.body.name) {
    res.status(400).json({ message: "A username is needed" });
  }
  try {
    const results = await userDB.insert(req.body);
    res.status(200).json({ results });
  } catch (err) {
    if (err.errno === 19) {
      res.status(500).json({ message: "Username needs to be unique" });
    }
    res.status(500).json(err);
  }
});

server.listen(9001);
