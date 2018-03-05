const express = require("express");
const bodyParser = require("body-parser");

const server = express();
const PORT = 3030;

const idCounter = 0;
const users = {
  1: "nikhil",
  2: "eileen"
};

server.use((req, res, next) => {
  console.log("Got a request");
  next();
});

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

server.post("/users", (req, res) => {
  idCounter++
  const newUser = {
    name: req.body,
    id: idCounter
  }
  users = {...users, newUser};

  res.status(200);
  res.send(users);
})

server.listen(PORT, (err) => {
  if (err) {
    console.log(`There was an error: ${err}`);
  }
  else {
    console.log(`Server is listening on port ${PORT}`);
  }
});