const express = require("express");
const router = express.Router();
const db = require("./userDb.js");

router.post("/", (req, res) => {});

router.post("/:id/posts", (req, res) => {});

router.get("/", (req, res) => {});

router.get("/:id", (req, res) => {});

router.get("/:id/posts", (req, res) => {});

router.delete("/:id", (req, res) => {});

router.put("/:id", (req, res) => {});

//custom middleware

//validates the user id on every request that expects a user id parameter

function validateUserId(req, res, next) {
  // if the id parameter is valid, store that user object as req.user
  const { id } = req.params;
  db.getById(id).then(userId => {
    if (userId) {
      req.userId = userId;
      next();
      // if the id parameter does not match any user id in the database, cancel the request and respond with status 400 and { message: "invalid user id" }
    } else {
      res.status(404).json({
        Message: "invalid user id"
      });
    }
  });
  // do i need a catch right here or nah?
}

// validateUser validates the body on a request to create a new user
function validateUser(req, res, next) {
  // if the request body is missing, cancel the request and respond with status 400 and { message: "missing user data" }
  if (null) {
  } else {
    // if the request body is missing the required name field, cancel the request and respond with status 400 and { message: "missing required name field" }
    res.status(404).json({
      Message: "missing required name field"
    });
  }
}

// validatePost validates the body on a request to create a new post

function validatePost(req, res, next) {
  // if the request body is missing, cancel the request and respond with status 400 and { message: "missing post data" }
  if (null) {
    // if the request body is missing the required text field, cancel the request and respond with status 400 and { message: "missing required text field" }
  } else {
    res.status(404).json({
      Message: "missing post data"
    });
  }
}

module.exports = router;
