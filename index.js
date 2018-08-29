const express = require("express");
const db = require("./data/helpers/userDb.js");
const helmet = require('helmet')
const PORT = 9000;
const server = express();

server.use(express.json());
server.use(helmet()); 

//middleware
function upperCase(req, res, next) {
  console.log(req.body.name);
  let name = req.body.name
  const newName = name
    .split(" ")
    .map(name => name[0].toUpperCase() + name.slice(1, name.length))
    .join(" ");
  console.log(newName);
  req.upperName = newName;
  console.log(req.upperName);
  next();
}

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

server.post("/api/users", upperCase, (req, res) => {
  const { name } = req.body;
  const send = { name: req.upperName };
  console.log(send);
  if (name && name.length <= 128) {
    db.insert(send)
      .then(user => {
        res.status(201).json(send);
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  } else {
    res.status(400).json({
      message: "You need a name and it has to be less than 128 characters"
    });
  }
});

server.put("/api/users/:id", upperCase, (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  const send = { name: req.upperName };
  if (name && name.length <= 128) {
    db.update(id, send)
      .then(user => {
        if (user) {
          res.status(200).json(send);
        } else {
          res
            .status(404)
            .json({ message: `The user with id ${id} was not found.` });
        }
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  } else {
    res.status(400).json({
      message: "You need a name and it has to be less than 128 characters"
    });
  }
});

server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  db.remove(id)
    .then(user => {
      if (user) {
        console.log(user);
        res.status(204).end();
      } else {
        res
          .status(404)
          .json({ message: `The user with id ${id} was not found.` });
      }
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});



server.listen(PORT, () => console.log(`\n== API on port ${PORT}==\n`));
