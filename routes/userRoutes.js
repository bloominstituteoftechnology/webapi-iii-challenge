const express = require("express");

const db = require("../data/helpers/userDb");

const router = express.Router();

router.get("/", (req, res) => {
  db
    .get()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  db
    .get(id)
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The user information could not be retrieved." });
    });
});

router.post("/", (req, res) => {
  db
    .insert(req.body)
    .then(user => {
      db
        .get(user.id)
        .then(newUser => {
          res.status(200).json(newUser);
        })
        .catch(err =>
          res
            .status(500)
            .json({ error: "The user with the specified ID does not exist." })
        );
    })
    .catch(err => {
      if (!req.body.hasOwnProperty("name")) {
        res.status(400).json({
          errorMessage: "Please provide a name for the user."
        });
      } else {
        res.status(500).json({
          error: "There was an error while saving the user to the database."
        });
      }
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  db
    .get(id)
    .then(user => {
      if (user) {
        db
          .get(id)
          .then(user => {
            // user = { ...users };
            db.remove(id).then(response => {
              res.status(200).json({ ...user });
            });
          })
          .catch(err =>
            res.status(500).json({ error: "The user could not be removed." })
          );
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The user information could not be retrieved." });
    });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  db
    .get(id)
    .then(user => {
      if (!req.body.hasOwnProperty("name")) {
        res.status(400).json({
          errorMessage: "Please provide a name for the user."
        });
      } else if (user) {
        db
          .update(id, req.body)
          .then(user => {
            db.get(id).then(user => {
              res.status(200).json({ ...user });
            });
          })
          .catch(err =>
            res
              .status(500)
              .json({ error: "The user information could not be modified." })
          );
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The user information could not be retrieved." });
    });
});

module.exports = router;
