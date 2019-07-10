const express = require("express");
const router = express.Router();
const data = require("./userDb");
const { logger } = require("../server");

router.post("/", logger, validateUser, (req, res) => {
  console.log(req.body);
  res.status(200).json(req.body);
});

router.post("/:id/posts", logger, validateUserId, validatePost, (req, res) => {
  data
    .insert(req.params.id)
    .then(users => {
      if (users.length === 0)
        return error.status(404).json("error: could not find users");
      return res.status(200).json(users);
    })
    .catch(error => {
      return error.status(404).json("error: could not find users");
    });
});

router.get("/", logger, (req, res) => {
  data
    .get()
    .then(users => {
      if (users.length === 0)
        return error.status(404).json("error: could not find users");
      res.status(200).json(users);
    })
    .catch(error => {
      error.status(404).json("error: could not find users");
    });
});

router.get("/:id", logger, (req, res) => {
  data
    .getById(req.params.id)
    .then(users => {
      console.log(users.length);
      if (users.length === 0) {
        return res.status(404).json("error: could not find users");
      }
      return res.status(200).json(users);
    })
    .catch(error => {
      return res.status(404).json("error: could not find users");
    });
});

router.get("/:id/posts", logger, validateUserId, (req, res) => {
  data
    .getUserPosts(req.params.id)
    .then(users => {
      if (users.length === 0)
        return res.status(404).json("error: could not find users");
      return res.status(200).json(users);
    })
    .catch(error => {
      return res.status(404).json("error: could not find users");
    });
});

router.delete("/:id", logger, validateUserId, (req, res) => {
  data
    .remove(req.params.id)
    .then(users => {
      if (users.length === 0)
        return res.status(404).json("error: could not find users");
      return res.status(200).json(users);
    })
    .catch(error => {
      return res.status(404).json("error: could not find users");
    });
});

router.put("/:id", logger, validateUserId, validatePost, (req, res) => {
  data
    .update(req.params.id)
    .then(users => {
      if (users.length === 0)
        return res.status(404).json("error: could not find users");
      return res.status(200).json(users);
    })
    .catch(error => {
      return res.status(404).json("error: could not find users");
    });
});

//custom middleware

function validateUserId(req, res, next) {
  if (req.params.id) {
    next();
  } else {
    res.status(400).send("Please provide valid info");
  }
}

function validateUser(req, res, next) {
  if (req.body.name) {
    next();
  } else {
    res.status(400).send("Please provide valid info");
  }
}

function validatePost(req, res, next) {
  if (req.body.text) {
    next();
  } else {
    res.status(400).send("Please provide valid info");
  }
}

module.exports = router;
