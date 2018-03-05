const express = require("express");
const bodyParser = require("body-parser");

const server = express();
const PORT = 3030;

const users = {
  1: "Joe",
  2: "John",
  3: "Jerry",
};

server.get("/users", (req, res) => {
  res.status(200);
  res.send(users);
})

server.post("/", (req, res) => {
  const { user } = req.body;
  if(!user) {
    res.status(422);
    res.json({ error: 'Must provide user'})
    return;
  }
  users.push(user);
  res.json({ users });
});

server.listen(PORT, err => {
  if (err) {
    console.log(`ERROR! ${err}`);
  } else {
    console.log(`SERVER! ${PORT}`);
  }
});