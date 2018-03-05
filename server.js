const express = require("express");
const bodyParser = require("body-parser");

const server = express();
const PORT = 3000;

let idGen = 0;
let users = [
  {
    name: "Bob Marley",
    id: 0
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

server.get("/", (req, res) => {
  res.status(200);
  res.send(req.body);
});

server.listen(PORT, err => {
  if (err) {
    console.log(`There was an erorr starting the server: ${err}`);
  } else {
    console.log(`Server is listening on port ${PORT}`);
  }
});
