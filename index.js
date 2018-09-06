const express = require("express");
const db = require("./data/helpers/userDb.js");
const server = express();
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const userDb = require("./data/helpers/userDb.js");
const postDb = require("./data/helpers/postDb.js");

server.use(express.json());
server.use(helmet());
server.use(morgan("dev"));
server.use(cors());
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
        if (req.uppercase)
          users = users.map(eachUser => eachUser.name.toUpperCase());
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
  }
);

server.post("/users/posts", async (req, res) => {
  const posts = req.body;
  db.insert(posts)
    .then(post => {
      if (!posts.name) {
        res.status(400).json({ error: "Provide name for user" });
      } else {
        res.status(201).json(post);
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "There was error" });
    });
});

server.put("/users/:id", (req, res) => {
  const id = req.param.id;
  const user = req.body;

  users.update;
});

//start my server up
server.listen(8000, () => console.log("\n=== API on port 8k ===\n"));
