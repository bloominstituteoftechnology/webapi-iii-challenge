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
// ======== USERS ==========
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

// PUT
server.put("/users/:id", uppercase, (req, res) => {
  const id = req.params.id;
  const changes = req.body.uppercaseName;
  console.log(id);
  console.log(changes);
  userDb
    .update(id, {name: changes})
    .then(count => {
      if (count > 0) {
        res.status(201).json(count);
      } else {
        res.status(404).json({error: "user doesn't exist"});
      }
    })
    .catch(err => {
      res.status(500).json({error: "something went wrong"});
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
        res
          .status(404)
          .json({error: "can't delete a user that doesn't exist yo"});
      }
    })
    .catch(err => {
      res.status(500).json({error: "something went wrong"});
    });
});

// ######### POSTS #########
// - id: number, no need to provide it when creating posts, the database will automatically generate it.
// - userId: number, required, must be the id of an existing user.
// - text: string, no size limit, required.

server.use(uppercase);
// server.post("/users");

server.listen(port, () =>
  console.log(`\nServer is listening on port ${port}\n`)
);
