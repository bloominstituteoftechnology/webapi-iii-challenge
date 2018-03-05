const express = require("express");
const bodyParser = require("body-parser");

const server = express();
const PORT = 3030;

let idCounter = 9;
const users = {
  1: "nikhil",
  2: "eileen",
  3: "ivan",
  4: "satish",
  5: "sean",
  6: "luis",
  7: "eileen",
  8: "ben",
  9: "nikhil"
};

server.use((req, res, next) => {
  console.log("Got a request");
  next();
});

server.use(bodyParser.json());

// GET all users
server.get("/users", (req, res) => {
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

// GET specific user based on id
server.get("/:id/", (req, res) => {
  const {
    id
  } = req.params;
  res.status(200);
  res.send(users[id])
});

// DELETE user based on id
server.delete("/:id/", (req, res) => {
  let id = req.params.id;
  delete users[id]
  res.status(200);
  res.send(users)
});

// POST new user
server.post("/users", (req, res) => {
  let user = req.body.user;
  console.log(user);
  idCounter++;
  users[idCounter] = user;
  res.status(200);
  res.send(users);
});

// SEARCH for users and return an array of matches
server.get('/users/search',(req, res) => {
  let name = req.query.name;
  const matchedUsers = [];
  console.log(name);
  Object.values(users).forEach(value => {
    if (value === name) {
      matchedUsers.push(value);
    }
  })
  res.status(200);
  res.send(matchedUsers);
}) 

server.listen(PORT, (err) => {
  if (err) {
    console.log(`There was an error: ${err}`);
  }
  else {
    console.log(`Server is listening on port ${PORT}`);
  }
});