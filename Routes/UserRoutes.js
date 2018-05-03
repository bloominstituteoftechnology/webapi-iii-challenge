const express = require("express");

const router = express.Router();

const db = require("../data/helpers/userDb");
//this code is wrong
router.get("/", (req, res, next) => {
  const { id } = req.query;
  let user;
  db.get(id).then(foundUser => {
    res.json(foundUser);
  });
});

//router.put
//router.post
//router.delete

module.exports = router;
