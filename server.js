const express = require('express');
const bodyParser = require('body-parser');

const server = express();
const port = 3030;

let idCounter = 1;
let users = [
  {
    name: "",
    id: 0
  }
]

server.get("/", (req, res) => {
  res.status(200);
  res.send(users);
})

server.listen(PORT, err => {
  if (err) {
    console.log(`There was an error starting the server: ${err}`);
  } else {
    console.log(`Server is listening on ${PORT}`);
  }
});