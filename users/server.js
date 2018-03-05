const express = require('express');
const bodyParser = require('body-parser');

const server = express();
const PORT = 3000;
const STATUS_SUCCESS = 200;

let idCounter = 2;
const users = [
  {
    id: 0,
    name: "Bob",
    age: 20
  },
  {
    id: 1,
    name: "Sue",
    age: 30
  }
];

server.get("/users", (req, res) => {
  /*if (req.query.name) {
    const matchingUsers = users.filter(user => {
      user.name === req.query.name
    });
    res.status(STATUS_SUCCESS);
    res.send(matchingUsers);
  } else {*/
    res.status(STATUS_SUCCESS)
    res.send(users);
  //}
})

server.get("/users/:id", (req, res) => {
  const { id } = req.params;
  res.status(STATUS_SUCCESS);
  res.send(users[id]);
})

server.listen(PORT, err => {
  if (err) {
    console.log("Error" + err)
  } else {
    console.log(`server is listening on ${PORT}`);
  }
})
