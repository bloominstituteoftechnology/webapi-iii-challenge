// Node Modules
const express = require("express");

// Router level middleware
const router = express.Router();

const db = require("../helpers/userDb");

router.get("/", (res, req) => {
  db
    .get()
    .then(users => {
      res.json(users);
    })
    .catch(error => {
      res.statusCode(500).json({
        error: "There was an error while retrieving users."
      });
    });
});
