const express = require("express");
const router = express.Router();
const userDB = require("../data/helpers/userDb.js");
const uppercase = require("../middleware/uppercase.js");

// G E T   A L L  U S E R S
router.get("/all", (req, res) => {
  userDB
    .get()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error =>
      res.status(500).json({ message: "Cannot retrieve users." })
    );
});

// C R E A T E  a  U S E R  with  U P P E R C A S E  M I D D L E W A R E
router.post("/", uppercase, (req, res) => {
  userDB
    .insert(req.body)
    .then(userData => {
      res.status(201).json(userData);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "There was an error creating the user", err });
    });
});

module.exports = router;
