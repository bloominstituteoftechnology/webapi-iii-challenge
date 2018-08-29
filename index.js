const express = require("express");
const PORT = 9000;
const db = require("./data/helpers/userDb.js");
const server = express();

server.use(express.json());

server.get("/api/users", (req, res) => {
  db.get()
    .then(users => {
      console.log(users);
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});

server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  db.get(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ message: `The user with id ${id} was not found` });
      }
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});

server.post("/api/users", (req, res) => {
  res.send("Creating");
});

server.put("/api/users/:id", (req, res) => {
  res.send("Updating");
});

server.delete("/api/users/:id", (req, res) => {
  res.send("Deleting");
});

server.listen(PORT, () => console.log(`\n== API on port ${PORT}==\n`));
