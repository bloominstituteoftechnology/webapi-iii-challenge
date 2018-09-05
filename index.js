// const helmet = require("helmet");
// const users = require()
const express = require("express");
const server = express();

const db = require("./data/helpers/userDb");

server.use(express.json());

//add middleware
function upperCase(req, res, next) {
  //   console.log("UpperCase Middleware: ", req.params);
  req.uppercase = true;
  next();
}

// server.use(upperCase);

//global use of middleware
// server.use(express.json());

//add routes
server.get("/users", (req, res) => {
    db.get()
    .then(users => {
      if (users) {
        user = users.map(eachUser => eachUser.name.toUpperCase())
        res.status(200).json(users);
      } else {
        res.status(404).json({ message: "No users found" });
      }
    })
    .catch(err => {
      console.log("error", err);
      res.status(500).json({ message: "Error getting the information" });
    });

});

server.get("/users/:id", upperCase, (req, res) => {
  const id = req.params.id;
  db.get(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "No users found by that id" });
      }
    })
    .catch(err => {
      console.log("error", err);
      res
        .status(500)
        .json({ message: "Error getting the information for each character" });
    });
});

//server listening
server.listen(8000, () => console.log("\n== API on Port 9K"));
