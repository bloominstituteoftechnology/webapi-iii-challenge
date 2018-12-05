const userDb = require("./data/helpers/userDb.js");
const express = require("express");
const server = express();
const helmet = require("helmet");
const morgan = require("morgan");
const customMW = require("./customMiddleware.js");

const PORT = 4000;

server.use(express.json());
server.use(helmet());
server.use(morgan("dev"));
const makeUppercase = customMW.makeUppercase;

server.get("/api/users", (req, res) => {
  userDb
    .get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ error: "could not retrieve users" });
    });
});

server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  userDb
    .get(id)
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: "user does not exist" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "user could not be retrieved." });
    });
});

server.get("/api/users/:id/posts", (req, res) => {
  const { id } = req.params;
  userDb
    .getUserPosts(id)
    .then(posts => {
      userDb
        .get(id)
        .then(user =>
          user
            ? posts[0]
              ? res.status(200).json(posts)
              : res.status(400).json({ error: "user has no posts" })
            : res.status(404).json({ error: "user does not exist" })
        );
    })
    .catch(err => {
      res.status(500).json({ error: "could not retrieve user posts" });
    });
});

server.post("/api/users", makeUppercase, async (req, res) => {
  const newUserBody = req.body;
  if (newUserBody.name === "") {
    res.status(400).json({ error: "name must include characters" });
  } else if (newUserBody.name.length > 128) {
    res.status(400).json({ error: "name must not exceed 128 characters" });
  } else {
    try {
      const userId = await userDb.insert(newUserBody);
      const newUser = await userDb.get(userId.id);
      res.status(201).json(newUser);
    } catch (err) {
      res.status(500).json({ error: "trouble adding user" });
    }
  }
});

server.put("/api/users/:id", makeUppercase, async (req, res) => {
  const { id } = req.params;
  const updatedUserBody = req.body;
  userDb.get(id).then(async user => {
    if (user) {
      if (updatedUserBody.name === "") {
        res.status(400).json({ error: "name must include characters" });
      } else if (updatedUserBody.name.length > 128) {
        res.status(400).json({ error: "name must not exceed 128 characters" });
      } else {
        try {
          const updated = await userDb.update(id, updatedUserBody);
          const updatedUser = await userDb.get(id);
          res.status(200).json(updatedUser);
        } catch (err) {
          res.status(500).json({ error: "trouble updating user" });
        }
      }
    } else {
      res.status(404).json({ error: "user does not exist" });
    }
  });
});

server.delete("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const deleted = await userDb.get(id);

  userDb.get(id).then(user => {
    if (user) {
      userDb
        .remove(id)
        .then(count => {
          res.status(200).json(deleted);
        })
        .catch(err => {
          res.status(500).json({ error: "trouble deleting user" });
        });
    } else {
      res.status(404).json({ error: "user does not exist" });
    }
  });
});

server.listen(PORT, err => {
  console.log(`server is now running on port ${PORT}`);
});
