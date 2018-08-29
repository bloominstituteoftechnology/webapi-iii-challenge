const express = require("express");
const server = express();

const userDB = require("./data/helpers/userDb.js");

server.use(express.json());

// test request
// server.get("/", (req, res) => {
//   res.send("Working Server Test");
// });

// GET REQUEST
server.get("/users", (req, res) => {
  userDB
    .get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The users information could not be retrieved." });
    });
});

server.get("/users/:id", (req, res) => {
  const id = req.params.id;
  userDB
    .get(id)
    .then(user => {
      if (user.length === 0) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      } else {
        return res.status(200).json(user);
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

server.listen(8000, () => console.log("\n== API on port 8k ==\n"));
