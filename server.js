const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const userDb = require("./data/helpers/userDb");
const postDb = require("./data/helpers/postDb");
const tagDb = require("./data/helpers/tagDb");

const server = express();

//middleware
server.use(express.json());
server.use(helmet());
server.use(cors({}));

//routing/endpoints

//userDb
server.get("/api/users", (req, res) => {
  userDb
    .get()
    .then(response => {
      res.json(response);
    })
    .catch(error => {
      return error;
    });
});

server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  userDb
    .get(id)
    .then(response => {
      if (response === 0) {
        return errorHelper(404, "No user by that Id in the DB", res);
      }
      res.json(response);
    })
    .catch(error => {
      return error;
    });
});

server.get("/api/users/posts/:userId", (req, res) => {
  const { userId } = req.params;
  userDb
    .getUserPosts(userId)
    .then(response => {
      res.json(response);
    })
    .catch(error => {
      return error;
    });
});

server.post("/api/users", (req, res) => {
  const { name } = req.body;
  userDb
    .insert({ name })
    .then(response => {
      res.json(response);
    })
    .catch(error => {
      return error;
    });
});

server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  userDb
    .update(id, { name })
    .then(response => {
      db.find(id).then(user => {
        res.json(user);
      });
    })
    .catch(error => {
      return error;
    });
});

server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  userDb
    .remove(id)
    .then(response => {
      res.json({ response: response });
    })
    .catch(error => {
      return error;
    });
});

server.listen(8000, () => console.log("\n=== API running... ===\n"));
