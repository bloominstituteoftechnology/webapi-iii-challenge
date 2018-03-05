const express = require("express");
const bodyParser = require("body-parser");

const server = express();
const PORT = 3030;
const SUCCESS = 200;

let idCounter = 1;
let users = [];

server.use(bodyParser.json());

server.get("/users", (req, res) => {
  res.status(SUCCESS);
  res.send(users);
});

server.get("/users/:id", (req, res) => {
  const { id } = req.params;
  let selected = null;
  users.forEach((user) => {
    if (user.id === +id) selected = user;
  });
  res.status(SUCCESS);
  res.send(selected);
});

server.get("/search", (req, res) => {
  const { name } = req.query;
  results = users.filter(obj => obj.name.toLowerCase() === name.toLowerCase());
  res.status(SUCCESS);
  res.send(results);
});

server.post("/users", (req, res) => {
  const { name } = req.body;
  newUser = {
    id: idCounter++,
    name
  }
  users.push(newUser);
  res.status(SUCCESS);
  res.send(users);
})

server.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  users = users.filter((name) => name.id !== +id);
  res.status(SUCCESS);
  res.send(users);
});

server.listen(PORT, (err) => {
  if (err) {
    console.log("Something broke: ", err);
  } else {
    console.log("Server listening on port: ", PORT);
  }
});
