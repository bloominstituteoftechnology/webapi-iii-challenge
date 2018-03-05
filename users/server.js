const express = require('express');
const bodyParser = require('body-parser');

const server = express();
const PORT = 3000;
const STATUS_SUCCESS = 200;

let idCounter = 2;
const users = [
  {
    id: 1,
    name: "Bob",
    age: 20
  },
  {
    id: 2,
    name: "Sue",
    age: 30
  }
];

server.get("/users", (req, res) => {

  
  res.send(users);
})

server.listen(PORT, err => {
  if (err) {
    console.log("Error" + err)
  } else {
    console.log(`server is listening on ${PORT}`);
  }
})
