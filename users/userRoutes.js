const express = require("express");

const users = require("../data/helpers/userDb");

const router = express.Router();

// local middleware
const uppercaseName = (req, res, next) => {
  req.body.name = req.body.name.toUpperCase();
  next();
};


// this router handles anything that begins with /users
// GET all users
router.get("/", (req, res) => {
  users
    .get()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(500).json({ error: "The users list could not be retrieved." });
    });
});

// GET user by ID
router.get("/:id", (req, res) => {
  users
    .get(req.params.id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist" });
      }
    })
    .catch(err => {
      console.log("Error: ", err);
      res
        .status(500)
        .json({ error: "The user information could not be retrieved." });
    });
});

// PUT 
router.put("/:id", uppercaseName, (req, res) => {
  if (req.body.name) {
    users
      .update(req.params.id, req.body)
      .then(user => {
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({
            message: "The user with the specified ID does not exist."
          });
        }
      })
      .catch(err =>
        res
          .status(500)
          .json({ error: "The user information could not be modified." })
      );
  } else {
    res.status(400).json({
      errorMessage: "Please provide a name for the user."
    });
  }
});

// POST 
router.post("/", uppercaseName, (req, res) => {
  const user = req.body;
  users
    .insert(user)
    .then(response => {
      if (user.name) {
        res.status(201).json({ message: "user created successfully" });
      } else {
        res.status(404).json({ message: "eser needs a name" });
      }
    })
    .catch(err =>
      res
        .status(500)
        .json({ error: "The user information could not be modified." })
    );
});

// DELETE
router.delete("/:id", (req, res) => {
  users
    .remove(req.params.id)
    .then(response => {
      if (response) {
        res.status(204).json({ message: "user deleted" });
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(err =>
      res.status(500).json({ error: "The user could not be removed" })
    );
});

module.exports = router;
