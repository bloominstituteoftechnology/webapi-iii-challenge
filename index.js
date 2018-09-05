const express = require("express");
const upperCase = require("./upperCase");
const userDB = require("./data/helpers/userDb");
const helmet = require("helmet");
const morgan = require("morgan");

const server = express();
server.use(express.json());
server.use(upperCase.uppercase);
server.use(helmet());
server.use(morgan());

// USER Routes
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

server.put("/users/:id", async (req, res) => {
  if (!Number(req.params.id)) {
    res.status(400).json({ message: "ID is not a number" });
  }
  if (!req.body.name) {
    res.status(400).json({ message: "Username Needed" });
  }
  try {
    const results = await userDB.update(Number(req.params.id), req.body);
    if (results === 1) {
      res.status(200).json({ message: "Success" });
    }
    res.status(500).json({ message: "Cannot remove with that ID" });
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

// POST Routes
server.get("/posts", async (req, res) => {
  try {
    const results = await postDB.get();
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json(err);
  }
});

server.get("/posts/:id", async (req, res) => {
  if (!Number(req.params.id)) {
    res.status(400).json({ message: "ID is not a number" });
  }
  try {
    const results = await postDB.get(Number(req.params.id));
    if (results) {
      res.status(200).json(results);
    }
    res.status(500).json({ message: "Invalid lookup criterion" });
  } catch (err) {
    res.status(500).json(err);
  }
});

server.put("/posts", async (req, res) => {
  if (!req.body.id || !req.body.text) {
    res.status(400).json({ message: "Missing content" });
  }
  try {
    const results = await postDB.insert(req.body);
    res.status(200).json({ message: "Success" });
  } catch (err) {
    res.status(500).json(err);
  }
});

server.put("/posts/:id", async (req, res) => {
  if (!req.body.id || !req.body.text) {
    res.status(400).json({ message: "Content missing" });
  }
  if (!Number(req.params.id)) {
    res.status(400).json({ message: "Id is not a number" });
  }
  try {
    const results = await postDB.update(req.params.id, req.body);
    res.status(200).json({ message: "Success" });
  } catch (err) {
    res.status(500).json(err);
  }
});

server.listen(9001);
