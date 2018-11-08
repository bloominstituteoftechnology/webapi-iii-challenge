const express = require("express");
const userDb = require("../data/helpers/userDb");
const upperCase = require("../middleware/upperCase");

const router = express.Router();

router.get("/", (req, res) => {
  userDb
    .get()
    .then(users => res.status(200).json(users))
    .catch(err =>
      res
        .status(500)
        .json({ error: "The users information could not be retrieved." })
    );
});

router.get("/:id", (req, res) => {
  userDb
    .get(req.params.id)
    .then(user => {
      user
        ? res.status(200).json(user)
        : res.status(404).json({
            message: "The user with the specified ID does not exist."
          });
    })
    .catch(err =>
      res
        .status(500)
        .json({ error: "The user information could not be retrieved." })
    );
});

router.post("/", upperCase, (req, res) => {
  req.body.name
    ? userDb
        .insert(req.body)
        .then(userId =>
          userDb.get(userId.id).then(user => res.status(200).json(user))
        )
        .catch(err =>
          res.status(500).json({
            error: "There was an error while saving the user to the database"
          })
        )
    : res.status(400).json({ message: "Please provide a name for the user." });
});

router.put("/:id", upperCase, (req, res) => {
  req.body.name
    ? userDb
        .update(req.params.id, req.body)
        .then(
          count =>
            count
              ? userDb
                  .get(req.params.id)
                  .then(user => res.status(200).json(user))
              : res.status(404).json({
                  message: "The user with the specified ID does not exist."
                })
        )
        .catch(err =>
          res.status(500).json({
            error: "The user information could not be modified."
          })
        )
    : res.status(400).json({ message: "Please provide a name for the user." });
});

router.delete("/:id", (req, res) => {
  userDb
    .remove(req.params.id)
    .then(count => {
      count
        ? res.status(204).json(count)
        : res.status(404).json({
            message: "The user with the specified ID does not exist."
          });
    })
    .catch(err =>
      res.status(500).json({ error: "The user could not be removed." })
    );
});

module.exports = router;
