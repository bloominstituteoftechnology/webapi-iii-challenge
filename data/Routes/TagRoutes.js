const express = require("express");
const tags = require("../helpers/tagDb.js");

const router = express.Router();
const upperCase = (req, res, next) => {
  req.body.tag = req.body.tag.toUpperCase();
  next();
};

router.get("/", (req, res) => {
  tags
    .get()
    .then(tags => res.status(200).json(tags))
    .catch(err =>
      res
        .status(500)
        .json({ error: "The tags information could not be retrieved." })
    );
});

router.post("/", upperCase, (req, res) => {
  const { tag } = req.body;
  if (!tag) {
    res
      .status(400)
      .json({ errorMessage: "Please provide a name for the user" });
  }
  tags
    .insert({ tag })
    .then(user => res.status(201).json(user))
    .catch(err =>
      res
        .status(500)
        .json({ error: "There was an error saving the user to the database." })
    );
});

router.get("/:id", (req, res) => {
  tags
    .get(req.params.id)
    .then(tag => {
      if (tag.length !== 0) {
        res.status(200).json(tag);
      }
    })
    .catch(err => {
      res
        .status(404)
        .json({ message: "The tag with the specified ID does not exist." });
    });
});

router.delete("/:id", (req, res) => {
  tags
    .get(req.params.id)
    .then(response => {
      if (response.length === 0) {
        return res
          .status(404)
          .json({ message: "The tag with the specified ID does not exist." });
      }
      res.status(200).json(response);
      tags
        .remove(req.params.id)
        .then(count => {
          if (count === 0) {
            return res.status(404).json({
              message: "The tag with the specified ID does not exist."
            });
          }
        })
        .catch(err => {
          res.status(500).json({ error: "The post could not be removed." });
        });
    })
    .catch(err => {
      res
        .status(404)
        .json({ error: "The tag with the specified ID does not exist." });
    });
});

router.put("/:id", upperCase, (req, res) => {
  const { tag } = req.body;
  if (!tag) {
    res.status(400).json({
      errorMessage: "Please provide a userId and text for the post."
    });
  }
  tags
    .get(req.params.id)
    .then(response => {
      if (response.length === 0) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        tags
          .update(req.params.id, { tag })
          .then(count => {
            console.log(count);
            tags
              .get(req.params.id)
              .then(post => {
                res.status(200).json(post);
              })
              .catch(err => {
                res.status(500).json({
                  error: "The post information could not be retrieved."
                });
              });
          })

          .catch(err => {
            res.status(500).json({ error: err.message });
          });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
