const express = require("express");
const bodyParser = require("body-parser");

const server = express();
const PORT = 3030;

let idCounter = 5;
const users = {
  1: "nikhil",
  2: "eileen",
  3: "ivan",
  4: "satish",
  5: "sean"
};

server.use((req, res, next) => {
  console.log("Got a request");
  next();
});

server.use(bodyParser.json());

server.get("/", (req, res) => {
  if (req.query.name) {
    let user = null;
    Object.keys(users).forEach((id => {
      if (users[id] === req.query.name) {
        user = id;
      };
    }));
    res.status(200);
    res.send(user);
  } else {
    let usersArr = [];
    Object.keys(users).forEach((user, i) => usersArr.push(users[i + 1]));
    res.status(200);
    res.send(usersArr);
  }
});

server.get("/:id/", (req, res) => {
  const {
    id
  } = req.params;
  res.status(200);
  res.send(users[id])
});

server.delete("/:id/", (req, res) => {
  let id = req.params.id;
  delete users[id]
  res.status(200);
  res.send(users)
});

server.post("/users", (req, res) => {
  let user = req.body.user;
  console.log(user);
  idCounter++;
  users[idCounter] = user;
  res.status(200);
  res.send({ id: idCounter });
});

server.listen(PORT, (err) => {
  if (err) {
    console.log(`There was an error: ${err}`);
  }
  else {
    console.log(`Server is listening on port ${PORT}`);
  }
});