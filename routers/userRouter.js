const userDb = require("../data/helpers/userDb.js");
const customMW = require("../customMiddleware.js");

const express = require('express');
const router = express.Router();
const makeUppercase = customMW.makeUppercase;

router.get("/", (req, res) => {
  userDb
    .get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ error: "could not retrieve users" });
    });
});

router.get("/:id", (req, res) => {
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

router.get("/:id/posts", (req, res) => {
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
              : res.status(500).json({ message: "user has no posts" })
            : res.status(404).json({ error: "user does not exist" })
        );
    })
    .catch(err => {
      res.status(500).json({ error: "could not retrieve user posts" });
    });
});

router.post("/", makeUppercase, async (req, res) => {
  const newUserBody = req.body;
  if (newUserBody.name === "" || !newUserBody.name) {
    res.status(400).json({ error: "name must exist and include characters" });
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

router.put("/:id", makeUppercase, async (req, res) => {
  const { id } = req.params;
  const updatedUserBody = req.body;
  userDb.get(id).then(async user => {
    if (user) {
      if (updatedUserBody.name === "" || !newUserBody.name) {
        res.status(400).json({ error: "name must exist and include characters" });
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

router.delete("/:id", async (req, res) => {
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

module.exports = router;
