const express = require("express");
const bodyParser = require("body-parser");

const server = express();
const PORT = 3030;
const STATUS_SUCCESS = 200;
const STATUS_USER_ERROR = 422;

// const friends = ["Daniel", "Steven", "Leon"];
let idCounter = 3;
const friends = {
  1: "Daniel",
  2: "Steven",
  3: "Leon"
};

server.use((req, res, next) => {
    console.log("Got a request");
    next();
});

server.use(bodyParser.json());

server.get("/", (req, res) => {
    if (req.query.name) {
      let friend = null;
      Object.keys(friends).forEach((id => {
        if (friends[id] === req.query.name) {
          friend = id;
        };
      }));
      res.status(STATUS_SUCCESS);
      res.send(friend);
    } else {
      res.status(STATUS_SUCCESS);
      res.send(friends);
    }
  });
  
server.get("/:id/", (req, res) => {
const {
    id
} = req.params;
res.status(STATUS_SUCCESS);
res.send(friends[id])
});

server.post("/", (req, res) => {
    const {
      friend
    } = req.body;
  
    idCounter++;
    friends[idCounter] = friend;
    res.status(STATUS_SUCCESS);
    res.send({ id: idCounter });
  });
  
  server.listen(PORT, (err) => {
    if (err) {
      console.log(`There was an erorr starting the server: ${err}`);
    } else {
      console.log(`Server is listening on port ${PORT}`);
    }
  });
