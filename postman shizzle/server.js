const express = require("express");
const bodyParser = require("body-parser");

const server = express();
const PORT = 3104;

const users = {
  1: "Michael",
  2: "Terrie",
  3: "Ivan",
  4: "Patrick",
  5: "Leon",
  6: "Eileen",
  7: "Daniel",
  8: "Ivan",
  9: "Punit",
  10: "Michael"
};

server.use(bodyParser.json());

server.get("/", (req, res) => {
  res.status(200);
  res.send(users);
});

server.get("/:id/", (req, res) => {
  const {
    id
  } = req.params;
  res.status(200);
  res.send(users[id])
});

server.get("/search", (req, res) => {
  const name = req.query.name;
  const usersMatched = users.filter(user => {
    user = user.name.toLowerCase();
    return user === name.toLowerCase();
  });
  res.send(usersMatched);
});

server.listen(PORT, (err) => {
  if (err) {
    console.log(`There was an erorr starting the server: ${err}`);
  } else {
    console.log(`Server is listening on port ${PORT}`);
  }
});