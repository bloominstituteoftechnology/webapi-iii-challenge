// const server = require("./api/server");
const port = 8000;
const express = require("express");
const cors = require("cors");
const postDb = require("./data/helpers/postDb");
const userDb = require("./data/helpers/userDb");
const server = express();

server.use(express.json());
server.use(cors());
// server.use(helmet());
// server.use(morgan("short"));

function uppercase(req, res, next) {
  req.body.uppercaseName = req.body.name.toUpperCase();
  next();
}

// GET ALL
server.get("/users", (req, res) => {
  userDb
    .get()
    .then(users => {
      // console.log(users);
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({error: "error"});
    });
});

// GET BY USER ID
server.get("/users/:id", (req, res) => {
  userDb.get(req.params.id).then(user => {
    if (!user) {
      res.status(404).json({error: "user doesn't exist"});
    } else {
      res.status(200).send(user);
    }
  });
});

// ADD USER
server.post("/users", uppercase, (req, res) => {
  userDb.insert({name: req.body.uppercaseName}).then(user => {
    res.status(200).json({message: "success! user added"});
  });
});

// USER POSTS
server.get("/users/:id/posts", (req, res) => {
  userDb.getUserPosts(req.params.id).then(posts => {
    console.log(posts);
    res.status(200).send(posts);
  });
});

// DELETE
server.delete("/users/:id", (req, res) => {
  userDb
    .remove(req.params.id)
    .then(count => {
      if (count) {
        res.status(200).json(count);
      } else {
        res.status(404).json({error: "user doesn't exist"});
      }
    })
    .catch(err => {
      res.status(500).json({error: "something went wrong"});
    });
});

server.use(uppercase);
// server.post("/users");

server.listen(port, () =>
  console.log(`\nServer is listening on port ${port}\n`)
);
