const express = require("express");

const router = express.Router();

const db = require("../data/helpers/userDb");
//this code is wrong
router.get("/:id", (req, res, next) => {
  const { id } = req.query;
  let user;
  db.get(id).then(foundUser => {
    res.json(foundUser);
  });
});

module.exports = router;
