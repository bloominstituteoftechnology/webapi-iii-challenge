const express = require("express");
const helmet = require("helmet");
const server = express();
const db = require("./data/helpers/userDb.js");

server.use(express.json());

server.get("/api/users", (req, res) => {
  db.get()
    .then(LOTR => {
      res.status(200).json(LOTR);
    })
    .catch(err => {
      console.error("error", err);
      res
        .status(500)
        .json({ error: "the user information could not be retrieved" });
    });
});

server.get("/api/users/:id", (req, res) => {
  db.get(req.params.id)
    .then(LOTR => {
      res.status(200).json(LOTR);
    })
    .catch(err => {
      console.error("error", err);
      res
        .status(500)
        .json({ error: "the user information could not be retrieved" });
    });
});

server.post("/api/users", (req, res) => {
  if (req.body.name.length < 128) {
    db.insert(req.body)
      .then(LOTR => {
        res.status(200).json(LOTR);
      })
      .catch(err => {
        console.log("error", err);
        res
          .status(500)
          .json({ error: "the user information could not be posted" });
      });
  } else {
    res.status(401).json({ error: "tooLong" });
  }
});

server.put("/api/users/:id", (req, res) => {
  db.update(req.params.id, req.body)
    .then(LOTR => {
      res.status(200).json(LOTR);
    })
    .catch(err => {
      console.log("error", err);
      res.status(500).json({ message: "cannotUpdate" });
    });
});

server.delete("/api/users/:id", (req, res) => {
  db
    .remove(req.params.id)
    .then(LOTR => {
      res.status(200).json(LOTR);
    })
    .catch(err => {
      console.log("error", err);
      res.status(500).json({ message: "cannotDelete" });
    });
});

const port = 5000;
server.listen(port, () => console.log(`\n== API Running on port ${port} ==\n`));
