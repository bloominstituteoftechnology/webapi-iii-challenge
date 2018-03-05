const express = require('express');
const bodyParser = require('body-parser');

const server = express();
const PORT = 3000;
const STATUS_SUCCESS = 200;

let idCounter = 2;
const users = [
  {
    id: 0,
    name: "Bob",
    age: 20
  },
  {
    id: 1,
    name: "Sue",
    age: 30
  }
];

server.use(bodyParser.json());

server.get("/users", (req, res) => {
  res.status(STATUS_SUCCESS);
  res.send(users);
})

server.get("/users/:id", (req, res) => {
  const { id } = req.params;
  res.status(STATUS_SUCCESS);
  res.send(users[id]);
})

server.get("/search", (req, res) => {
  if (req.query.name) {
    const matchingUsers = users.filter(user => {
      return user.name.toUpperCase() === req.query.name.toUpperCase();
    });
    res.status(STATUS_SUCCESS);
    res.send(matchingUsers);
  } else {
    res.send("DIDN'T WORK");
  }
})

server.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  users.splice(id, 1);
  res.status(STATUS_SUCCESS);
  res.send(users);
})

server.listen(PORT, err => {
  if (err) {
    console.log("Error" + err)
  } else {
    console.log(`server is listening on ${PORT}`);
  }
})
