const express = require("express");
const userDb = require("../../data/helpers/userDb");
const router = express.Router();

router.get("/", (req, res) => {
  userDb
    .get()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send({ error: "The users could not be retrieved." }));
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  userDb
    .get(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(err => {
      console.log("Error: ", err);
      res.status(500).json({ error: "The user couldn't be retrieved" });
    });
});

router.post("/", async (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({ message: "Please provide name for user." });
  }
  try {
    let data = await userDb.insert(req.body);
    return res.status(201).json({
      id: data.id,
      name: req.body.name
    });
  } catch (err) {
    res.status(500).json({
      error: "There was an error while saving the user to the database"
    });
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  userDb.get(id).then(user => {
    if (!user) {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." });
    } else {
      userDb
        .remove(id)
        .then(user => {
          res.status(200).json(user);
        })
        .catch(err => {
          console.log("Error: ", err);
          res.status(500).json({ error: "The user could not be removed" });
        });
    }
  });
});

//updates the user and returns the updated user object
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const user = { name };

  if (!req.body.name) {
    return res
      .status(400)
      .json({ message: "Please provide a name for the new user." });
  } else {
    userDb.get(id).then(user => {
      if (!user) {
        return res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    });
  }

  userDb
    .update(id, user)
    .then(res.status(200))
    .catch(err => {
      console.log("Error: ", err);
      res
        .status(500)
        .json({ error: "The user information could not be modified." });
    });

  userDb.get(id).then(user => {
    if (user) {
      res.status(200).json(user);
    }
  });
});

module.exports = router;
