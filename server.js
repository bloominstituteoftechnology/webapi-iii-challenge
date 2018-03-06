const express = require("express");
const bodyParser = require("body-parser");

const server = express();
const PORT = 3000;

let idGen = 2;
let users = [
  {
    name: "Bob",
    id: 0
  },
  {
    name: "bob",
    id: 1
  },
  {
    name: "Jimmy",
    id: 2
  }
];

server.use((req, res, next) => {
  console.log("Got a request");
  next();
});

server.use(bodyParser.json());

server.post("/users", (req, res) => {
  ++idGen;
  const { name } = req.body;
  let newUser = {
    name,
    id: idGen
  };
  users.push(newUser);
  res.status(200);
  res.send(users);
});

server.get("/users", (req, res) => {
  res.status(200);
  res.send(users);
});

server.get("/users/:id", (req, res) => {
  const { id } = req.params;
  res.status(200);
  res.send(users[id]);
});

server.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  delete users[id];
  res.status(200);
  res.send(users);
});

server.get("/search", (req, res) => {
  let { name } = req.query;
  name.toLowerCase();
  let results = [];
  users.map(user => {
    if (user.name.toLowerCase() === name) results.push(user);
  });
  res.status(200);
  res.send(results);
});

server.listen(PORT, err => {
  if (err) {
    console.log(`There was an erorr starting the server: ${err}`);
  } else {
    console.log(`Server is listening on port ${PORT}`);
  }
});
