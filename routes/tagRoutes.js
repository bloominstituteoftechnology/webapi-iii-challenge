const express = require("express");

const db = require("../data/helpers/tagDb");

const router = express.Router();

router.get("/", (req, res) => {
  db
    .get()
    .then(tags => {
      res.json(tags);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  db
    .get(id)
    .then(tag => {
      if (tag) {
        res.json(tag);
      } else {
        res
          .status(404)
          .json({ message: "The tag with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The tag information could not be retrieved." });
    });
});

router.post("/", (req, res) => {
  db
    .insert(req.body)
    .then(tag => {
      db
        .get(tag.id)
        .then(newTag => {
          res.status(200).json(newTag);
        })
        .catch(err =>
          res
            .status(500)
            .json({ error: "The tag with the specified ID does not exist." })
        );
    })
    .catch(err => {
      if (!req.body.hasOwnProperty("tag")) {
        res.status(400).json({
          errorMessage: "Please provide a tag."
        });
      } else {
        res.status(500).json({
          error: "There was an error while saving the tag to the database."
        });
      }
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  db
    .get(id)
    .then(tag => {
      if (tag) {
        db
          .get(id)
          .then(tag => {
            db.remove(id).then(response => {
              res.status(200).json({ ...tag });
            });
          })
          .catch(err =>
            res.status(500).json({ error: "The tag could not be removed." })
          );
      } else {
        res
          .status(404)
          .json({ message: "The tag with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The tag information could not be retrieved." });
    });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  db
    .get(id)
    .then(tag => {
      if (!req.body.hasOwnProperty("tag")) {
        res.status(400).json({
          errorMessage: "Please provide a tag."
        });
      } else if (tag) {
        db
          .update(id, req.body)
          .then(tag => {
            db.get(id).then(tag => {
              res.status(200).json({ ...tag });
            });
          })
          .catch(err =>
            res
              .status(500)
              .json({ error: "The tag information could not be modified." })
          );
      } else {
        res
          .status(404)
          .json({ message: "The tag with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The tag information could not be retrieved." });
    });
});

module.exports = router;
