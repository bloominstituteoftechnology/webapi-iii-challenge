const express = require("express");
const postDb = require("./data/helpers/postDb.js");
const userDb = require("./data/helpers/userDb.js");
const server = express();

const upercaseChecker = (req, res, next) => {};

server.use(express.json());

server.get("/", (req, res) => {
  res.send("Hello");
});

server.get("/users", (req, res) => {
  userDb
    .get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.error("error", err);
      res.status(500).json({ error: "The USERS data could not be retrieved." });
    });
});

server.get("/users/:id", (req, res) => {
  const id = req.params.id;
  userDb
    .get(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      console.error("error", err);
      res.status(500).json({ error: "The USER data could not be retrieved" });
    });
});

server.post("/users", (req, res) => {
  const postContents = req.body;
  const response = userDb.insert(postContents);
  userDb
    .insert(postContents)
    .then(users => {
      res.status(203).json(response);
    })
    .catch(err => {
      console.error("error", err);
      res.status(422).json({ error: "Unable to create post" });
    });
});

// server.put("/users", (req, res) => {
//   userDb
//     .update()
//     .then()
//     .catch();
// });

// server.delete("/users/:id", (req, res) => {
//   userDb
//     .remove()
//     .then()
//     .catch();
// });

const port = 8000;

server.listen(port, err => {
  console.log(`\n=== The server is up and running on ${port} ===\n`);
});

// server.get("/posts", (req, res) => {
//     console.log(postDb)
//   postDb
//     .find()
//     .then(posts => {
//       res.status(200).json(posts);
//     })
//     .catch(err => {
//       console.error("error", err);
//     });
// });
