const express = require("express");
const db = require("./data/helpers/userDb.js");
const server = express();
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
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

function capitalName(req, res, next) {
  req.body.name = req.body.name.toUpperCase();
  next();
}


//add routes
server.get("/users", (req, res) => {
  db.get()
    .then((users) => {
      if (users) {
        res.status(200).json(users);
      } else {
        res.status(404).json({ message: "No users found" });
      }
    })
    .catch((err) => {
      console.log("error: ", err);
      res.status(500).json({ error: "Users cannot be retrieved" });
    });
});

server.get(
  "/users/:id",
  /*auth,*/ (req, res) => {
    const id = req.params.id;
    db.get(id)
      .then((user) => {
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({ message: "whoops" });
        }
      })
      .catch((err) => {
        console.log("error: ", err);
        res.status(500).json({ error: "whoops again" });
      });
  }
);

server.get("/users/:id/posts", (req, res) => {
  const id = req.params.id;
  db.getUserPosts(id)
    .then((posts) => {
      if (posts) {
        res.status(200).json(posts);
      } else {
        res.status(404).json({ message: "Has no posts" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Could not be retrieved" });
    });
});


server.post("/users/:id", capitalName, async (req, res) => {
  const user = req.body;
  db.insert(user)
    .then((response) => {
      if (user.name) {
        res.status(201).json({ message: "User Created" });
      } else {
        res.status(404).json({ message: "User needs a name" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "User information could not be modified" });
    });
});

server.put("/users/:id", capitalName, (req, res) => {
  if (req.body.name) {
    db.update(req.param.id, req.body)
      .then((user) => {
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({ message: "Need ID" });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: "Not be modified" });
      });
  } else {
    res.status(400).json({ errorMessage: "Please give a name" });
  }
});

server.delete("/users/:id", (req, res) => {
  db.remove(req.params.id)
    .then((response) => {
      if (response) {
        res.status(204).json({ message: "User Deleted" });
      } else {
        res
          .status(404)
          .json({ message: "The User with that ID does not exist" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "The user could not be removed" });
    });
});


//start my server up
server.listen(8000, () => console.log("\n=== API on port 8k ===\n"));

