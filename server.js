const express = require("express");
const bodyParser = require("body-parser");

const server = express();
const PORT = 3030;
const SUCCESS = 200;

let idCounter = 1;
let users = [
  {
    id: '0',
    name: "Someone",
  },
  {
    id: '1',
    name: "Someone Else",
  }
];

server.use(bodyParser.json());

server.get("/users", (req, res) => {
  res.status(SUCCESS);
  res.send(users);
});

server.get("/users/:id", (req, res) => {
  const { id } = req.params;
  let selected = null;
  users.forEach((user) => {
    if (user.id === id) selected = user; 
  });
  res.status(SUCCESS);
  res.send(selected);
});

server.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  users = users.filter((user) => user.id !== id);
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
