const express = require("express");

const router = express.Router();

const db = require("../data/helpers/userDb");

router.get("/", (req, res) => {
  db
    .get()
    .then(users => {
      res.send(users);
    })
    .catch(error => {
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  db
    .get(id)
    .then(users => {
      res.send(users);
    })
    .catch(error => {
      res.status(500).json({ message: "cant find user" });
    });
});

router.get("/:id/posts", (req, res) => {
  const { id } = req.params;
  db
    .getUserPosts(id)
    .then(users => {
      res.send(users);
    })
    .catch(error => {
      res.status(500).json({ message: "can't find posts for this user" });
    });
});

router.post("/", (req, res) => {
  const user = req.body;
  db
    .insert(user)
    .then(response => {
      res.status(201).send(response);
    })
    .catch(error => {
      res
        .status(500)
        .send({ message: "there was an error while saving the user" });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  let user;

  db
    .get(id)
    .then(response => {
      user = { ...response[0] };
      db
        .remove(id)
        .then(response => {
          res.status(200).send(user);
        })
        .catch(error => {
          res.status(500).send(error);
        });
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const update = req.body;

  let user;

  db
    .update(id, update)
    .then(count => {
      if (count > 0) {
        db.findById(id).then(updatedUser => {
          res.status(200).send(updatedUser[0]);
        });
      } else {
        res
          .status(404)
          .send({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

module.exports = router;
