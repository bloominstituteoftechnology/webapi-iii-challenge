const express = require("express");
const db = require("./data/helpers/userDb");
const logger = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const middleware = require("./middleware.js");
const server = express();
const postRouter = require('./routers/post_router');

server.use(
  express.json(),
  logger("tiny"),
  helmet(),
  cors(),
  middleware.uppercase
);
server.use('/api/posts', postRouter);

const PORT = 5050;

server.get("/api/users", (req, res) => {
  db.get()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json({ message: "failed to get users" });
    });
});

server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  db.getUserPosts(id)
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "user does not exist" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "failed to get user" });
    });
});
server.post("/api/users", (req, res) => {
  const user = req.body;
  if (user.name) {
    db.insert(user)
      .then(idInfo => {
        db.getUserPosts(idInfo.id).then(user => {
          res.status(201).json(user);
        });
      })
      .catch(err => {
        res.status(500).json({ message: "failed insert user in db" });
      });
  } else {
    res.status(400).json({ message: "missing info, try again" });
  }
});

server.put("/api/users/:id", (req, res) => {
  const user = req.body;
  const { id } = req.params;

  if (user.name) {
    db.update(id, user)
      .then(count => {
        if (count) {
          db.getUserPosts(id).then(user => {
            res.json(user);
          });
        } else {
          res.status(404).json({ message: "invalid id" });
        }
      })
      .catch(err => {
        res.status(500).json({ message: "failed" });
      });
  } else {
    res.status(400).json({ message: "missing info!" });
  }
});

server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(count => {
      if (count) {
        // we would like to send back the user
        res.json({ message: "successfully deleted" });
      } else {
        res.status(404).json({ message: "invalid id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "failed to delete user" });
    });
});

server.listen(PORT, () => {
  console.log(`server is up and running on port ${PORT}`);
});
