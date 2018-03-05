const express = require("express");
const bodyParser = require("body-parser");

const server = express();
const PORT = 3030;
const SUCCESS = 200;

let idCounter = 1;
const users = [
  {
    id: 0,
    name: "Someone",
  },
];

server.use(bodyParser.json());

server.get("/users", (req, res) => {
  res.status(SUCCESS);
  res.send(users);
});

server.listen(PORT, (err) => {
  if (err) {
    console.log("Something broke: ", err);
  } else {
    console.log("Server listening on port: ", PORT);
  }
});