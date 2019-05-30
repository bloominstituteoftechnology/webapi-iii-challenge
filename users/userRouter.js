const express = require("express");
const usersDB = require("./userDb");
const posts = require("../posts/postDb");
const router = express.Router();

router.post("/", (req, res) => {});

router.post("/:id/posts", (req, res) => {});

router.get("/", (req, res) => {});

router.get("/:id", validateUserId, (req, res) => {});

router.get("/:id/posts", (req, res) => {});

router.delete("/:id", validateUserId, (req, res) => {});

router.put("/:id", validateUserId, (req, res) => {});

//custom middleware

function validateUserId(req, res, next) {
  const id = req.params.id;
  const user = usersDB.getById(id);
  if (user) {
    res.user = user;
    next();
  } else {
    res.status(400).json({ message: "Invalid User ID" });
  }
}

function validateUser(req, res, next) {}

function validatePost(req, res, next) {}

module.exports = router;
