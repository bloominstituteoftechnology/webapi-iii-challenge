const express = require("express");
const bodyParser = require("body-parser");

const server = express();
const PORT = 3030;
const STATUS_SUCCESS = 200;
const STATUS_USER_ERROR = 422;

// const friends = ["Daniel", "Steven", "Leon"];
let idCounter = 3;
const users = {
  1: "Daniel",
  2: "Steven",
  3: "Leon"
};

server.use((req, res, next) => {
    console.log("Got a request");
    next();
});

server.use(bodyParser.json());

server.get("/users/", (req, res) => {
    if (req.query.name) {
      let user = null;
      Object.keys(users).forEach((id => {
        if (users[id] === req.query.name) {
          user = id;
        };
      }));
      res.status(STATUS_SUCCESS);
      res.send(user);
    } else {
      res.status(STATUS_SUCCESS);
      res.send(users);
    }
  });
  
server.get("/users/:id/", (req, res) => {
const {
    id
} = req.params;
res.status(STATUS_SUCCESS);
res.send(users[id])
});

server.get("/search", (req, res) => {
  let name = req.query.name;
  let userArr = [];
  // if (name) {
  //  for(let i = 0; i < users.length; i++) {
  //    if(name.toUpperCase() === users[i].toUpperCase()) {
  //      userArr.push(users[i]);
  //    }
  //  }
  // }
  if (name) {
  Object.keys(users).forEach((id => {
    if (users[id].toUpperCase() === name.toUpperCase()) {
      // user = id;
      userArr.push(users[id]);
    };
  }));
  }
 res.status(STATUS_SUCCESS);
 res.send(userArr);
 });

server.post("/", (req, res) => {
    const { user } = req.body;
  
    idCounter++;
    users[idCounter] = user;
    res.status(STATUS_SUCCESS);
    res.send({ id: idCounter });
  });

  server.delete("/", (req, res) => {
    const {
      user
    } = req.body;
  
    idCounter++;
    users[idCounter] = user;
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
