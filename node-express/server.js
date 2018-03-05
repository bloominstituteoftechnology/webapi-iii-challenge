const express = require("express");
const bodyParser = require("body-parser");

const server = express();
const PORT = 3030;

let idCounter = 2;
const users = {
  1: "nikhil",
  2: "eileen"
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
    res.status(200);
    res.send(users);
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
  const {
    id
  } = req.params;
  console.log(req.params);
  users = users.filter((user) => {
    return user[id] !== user;
  })
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