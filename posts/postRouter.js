const express = require("express");
const data = require("./postDb");
const { logger } = require("../server");
const router = express.Router();

router.get("/", logger, (req, res) => {
  data
    .get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      error.status(404).json("error: could not find post");
    });
});

router.get("/:id", logger, validatePostId, (req, res) => {
  data
    .getById(req.params.id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      error.status(404).json("error: could not find post");
    });
});

router.delete("/:id", logger, validatePostId, (req, res) => {
  data
    .remove(req.params.id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      error.status(404).json("error: could not find post");
    });
});

router.put("/:id", logger, validatePostId, (req, res) => {
  console.log(req.body);
  data
    .update(req.params.id, req.body)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      error.status(404).json("error: could not find post");
    });
});

// custom middleware

function validatePostId(req, res, next) {
  if (req.params.id) {
    next();
  } else {
    res.status(400).send("Please provide valid info");
  }
}

module.exports = router;
