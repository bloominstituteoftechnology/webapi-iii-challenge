const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

const userDb = require("./data/helpers/userDb.js");

const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan("short"));

function upperCase(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

server.get("/api/users", async (req, res) => {
  try {
    const users = await userDb.get();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({
      message: "There was an error while retrieving users.",
      error: err
    });
  }
});

server.get("/api/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userDb.get(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({
        message: "User not found."
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "There was an error while retrieving the user.",
      error: err
    });
  }
});

server.post("/api/users", async (req, res) => {
  const name = req.body;

  if (!name || name.length > 128) {
    res.status(400).json({
      message: "Invalid username"
    });
  } else {
    name.name = upperCase(name.name);
  }

  try {
    const id = await userDb.insert(name);
    const user = await userDb.get(id.id);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({
      message: "There was an error while creating new user.",
      error: err
    });
  }
});

server.delete("/api/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const removedUser = await userDb.get(id);
    const removedCount = await userDb.remove(id);
    if (removedCount === 1) {
      res.status(200).json(removedUser);
    } else {
      res.status(404).json({
        message: "User not found."
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "There was an error while deleting this user.",
      error: err
    });
  }
});

server.put("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const name = req.body;

  if (!name || name.length > 128) {
    res.status(400).json({
      message: "Bad username"
    });
  } else {
    name.name = upperCase(name.name);
  }

  try {
    const editedCount = await userDb.update(id, name);
    if (editedCount === 1) {
      const editedUser = await userDb.get(id);
      res.status(200).json(editedUser);
    } else {
      res.status(404).json({
        message: "no user found."
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "There was an error updating this user.",
      error: err
    });
  }
});

module.exports = server;
