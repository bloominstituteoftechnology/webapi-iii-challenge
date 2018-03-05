const express = require("express");
const bodyParser = require("body-parser");

const server = express();

const PORT = 3030;
const STATUS_SUCCESS = 200;

let idCounter = 3;
const users = {
  1: "Ivan", 
  2: "Sean", 
  3: "Patrick",
};

server.use(bodyParser.json());

server.get("/users", (req, res) => {
  res.status(STATUS_SUCCESS);
  res.send(Object.values(users));
});

server.listen(PORT, (err) => {
  if (err) {
    console.log(`There was an error with the server: ${err}`);
    throw err;
  } else {
    console.log(`Server is listening on port: ${PORT}`);
  }
});
