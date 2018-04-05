const express = require("express");

const router = express.Router({ mergeParams: true });

const db = require("../data/helpers/tagDb.js");

router.get("/", (req, res) => {
  db
    .get()
    .then(tags => {
      res.json(tags);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "There was an error getting tags from the server." });
    });
});

router.get("/:tagId", (req, res) => {
  db
    .get(req.params.tagId)
    .then(tag => {
      res.json(tag);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "There was an error getting tags from the server." });
    });
});

router.post("/", (req, res) => {
  let newTag = req.body;
  db
    .insert(newTag)
    .then(tagId => {
      const { id } = tagId;
      db.get(id).then(tag => {
        res.json(tag);
      });
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "There was an error posting tags to the server." });
    });
});

router.delete("/:tagId", (req, res) => {
  db
    .remove(req.params.tagId)
    .then(num => {
      if (num < 1) {
        res.status(404).json({ message: "There is no tag with that id." });
      } else {
        res.json({
          message: `Tag with the id ${req.params.tagId} successfully deleted.`
        });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "There was an error deleting tag from the server." });
    });
});

router.put("/:tagId", (req, res) => {
  db
    .update(req.params.tagId, req.body)
    .then(count => {
      if (count < 1) {
        res.status(404).json({ message: "There was no tag by that ID" });
      } else {
        db.get(req.params.tagId).then(tag => {
          res.json(tag);
        });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "There was an error updating tags on the server." });
    });
});

module.exports = router;
