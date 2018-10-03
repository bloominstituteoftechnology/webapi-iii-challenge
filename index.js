// imports
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const userDB = require("./data/helpers/userDb");

// setup server
const server = express();
const port = 8000;
server.use(logger("combined"));
server.use(cors());
server.use(helmet());
server.use(express.json());

// MIDDLEWARES

const upperCase = (req, res, next) => {
  if (req.body.name) {
    req.body.name = req.body.name.toUpperCase();
  }
  next();
};

// ROUTES

// get users
server.get("/", (req, res) => {
  res.send("Hello World");
});

server.get("/users", upperCase, (req, res) => {
  userDB
    .get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => res.status(500).json({ error: "ERROROROR" }));
});

//get one users posts
server.get("/users/:id", upperCase, (req, res) => {
  userDB
    .getUserPosts(req.params.id)
    .then(userposts => {
      res.status(200).json(userposts);
    })
    .catch(err => res.status(500).json({ error: "ERROROROR" }));
});

//add user
server.post("/users", (req, res) => {
  const { id, name } = req.body;
  const newUser = { id: id, name: name };
  userDB
    .insert(newUser)
    .then(user => {
      res.json(user);
    })
    .catch(err => res.status(500).json({ error: "ERROROROR" }));
});

//delete user
server.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const foundUser = userDB.getUserPosts(id);
  if (foundUser) {
    userDB
      .remove(id)
      .then(users => {
        res.json(users);
      })
      .catch(err => res.status(500).json({ error: "ERROROROR" }));
  }
});

//edit user
server.put("/users/:id", (req, res) => {
  userDB
    .update(req.params.id, req.body)
    .then(posts =>
      res.json(posts).catch(err => res.status(500).json({ error: "ERROROROR" }))
    );
});

// server.get("/name/:name", yell, (req, res) => {
//   res.send(req.name);
// });

// call server.listen
server.listen(port, () => {
  console.log(`listening on ${port}`);
});
