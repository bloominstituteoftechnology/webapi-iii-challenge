const express = require("express");
const bodyParser = require("body-parser");

const server = express();
const PORT = 5000;
const STATUS_SUCCESS = 200;

const users = [
  {
    name: "Amanda",
    id: 0,
  },
  {
    name: "Tommy",
    id: 1,
  },
];
let userId = 2;

server.use((req, res, next) => {
  console.log("Got a request");
  next();
});

server.use(bodyParser.json());

server.get("/users", (req, res) => {
  res.status(STATUS_SUCCESS);
  res.send(users);
});

server.post("/users", (req, res) => {
  const { name } = req.body;
  newUser = {
    name,
    id: userId++,
  };
  users.push(newUser);
  res.status(STATUS_SUCCESS);
  res.send(users);
});

server.get("/users/:id", (req, res) => {
  const key = req.params.id;
  res.send(
    users.filter(user => {
      return key === user.id.toString();
    }),
  );
});

server.get("/search", (req, res) => {
  res.send(
    users.filter(user => {
      return user.name.toLowerCase() === req.query.name.toLowerCase();
    }),
  );
});

server.delete("/users/:id", (req, res) => {
  const key = req.params.id;
  res.send(
    users.filter(user => {
      return key !== user.id.toString();
    }),
  );
});

server.listen(PORT, err => {
  if (err) {
    console.log(`There was an error starting the server:${err}`);
  } else {
    console.log(`Server is listening on port ${PORT}`);
  }
});
