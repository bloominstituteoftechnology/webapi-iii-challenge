const express = require("express");
const db = require("./data/helpers/userDb.js");
const server = express();

server.use(express.json());

//add middleware
// function auth(req, res, next) {
//   req.params.id++;
//   const pass = "pass";
//   if (pass === "pass") {
//     next();
//   } else {
//     res.json({ message: "password incorrect" });
//   }
// }

function upperCase(req, res, next) {
    req.uppercase = true;
    next();
}

// server.use(upperCase);

//add routes
server.get("/users", upperCase, (req, res) => {
  db.get()
    .then(users => {
      if (users) {
        if(req.uppercase) users = users.map(eachUser => eachUser.name.toUpperCase())
        res.status(200).json(users);
      } else {
        res.status(404).json({ message: "No users found" });
      }
    })
    .catch(err => {
      console.log("error: ", err);
      res.status(500).json({ error: "Users cannot be retrieved" });
    });
});

server.get("/users/:id", /*auth,*/ (req, res) => {
  const id = req.params.id;
  db.get(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "whoops" });
      }
    })
    .catch(err => {
      console.log("error: ", err);
      res.status(500).json({ error: "whoops again" });
    });
});

//start my server up
server.listen(8000, () => console.log("\n=== API on port 8k ===\n"));
