const express = require("express");
const bodyParser = require("body-parser");

const server = express();

const PORT = 3030;
const STATUS_SUCCESS = 200;

let idCounter = 3;
const users = {
  1: "Ivan", 
  2: "Sean", 
  3: "Patrick",
};

server.use(bodyParser.json());

server.get("/users", (req, res) => {
  res.status(STATUS_SUCCESS);
  res.send(Object.values(users));
});

server.get("/users/:id", (req, res) => {
  const { id } = req.params;
  res.status(STATUS_SUCCESS);
  res.send(users[id]);
});

server.get("/search?name=<query>", (req, res) => {
  let user = null;
  Object.keys(users).forEach(id => {
    if (users[id] === req.query.name) {
      user = id;
    }
  });
  res.status(STATUS_SUCCESS);
  res.send(user);
});

server.post("/users", (req, res) => {
  const { user } = req.body;
  idCounter++;
  users[idCounter] = user;
  res.status(200);
  res.send({id: idCounter});
});

server.delete('/users/:id', (req, res) => {
  delete users[req.params.id];
  res.send(`DELETE user: ${req.params.id}`);
});

server.listen(PORT, (err) => {
  if (err) {
    console.log(`There was an error with the server: ${err}`);
    throw err;
  } else {
    console.log(`Server is listening on port: ${PORT}`);
  }
});
