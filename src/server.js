// server.js

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3030;

let users = [{ name: "john", id: 0 }, { name: "chuck", id: 1 }];
let id = 2;

app.use(bodyParser.json());
app.use(cors());

app.get("/users", (req, res) => {
  res.status(200).send(users);
});

app.get("/users/:id", (req, res) => {
  res.status(200).send(users[req.params.id]);
});

app.get("/search", (req, res) => {
  const name = req.query.name;
  const filteredUsers = users.filter(user => {
    user = user.name.toLowerCase();
    return user === name.toLowerCase();
  });
  res.send(filteredUsers);
});

app.post("/users", (req, res) => {
  const user = req.body.user;
  users = [...users, { name: user, id: id }];
  id++;
  res.send(users);
});

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  users = users.filter(user => {
    return user.id !== Number(id);
  });
  res.send(users);
});

app.listen(PORT, err => {
  if (err) {
    throw err;
  } else {
    console.log(`Listening on port: ${PORT}`);
  }
});
