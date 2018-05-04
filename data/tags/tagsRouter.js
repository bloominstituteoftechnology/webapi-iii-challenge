// Node Modules
const express = require("express");

// Router level middleware
const router = express.Router();

const db = require("../helpers/tagDb");

// GET tags; root
router.get("/", (req, res) => {
  db
    .get()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(500).json({
        error: "There was an error retrieving tags."
      });
    });
});

// GET tags by id
router.get("/:id", (req, res) => {
  const { id } = req.params;

  db
    .get(id)
    .then(tag => {
      res.status(200).json(tag);
    })
    .catch(error => ({
      error: "There was an error retrieving the specified tag."
    }));
});

// POST; add tags
router.post("/", (req, res) => {
  const tag = req.body;

  db
    .insert(tag)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(500).json({
        error: "There was an error adding tags."
      });
    });
});

// PUT; update tags by id
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const update = req.body;

  db
    .update(id, update)
    .then(count => {
      if (count > 0) {
        db.get(id).then(updatedTag => {
          res.status(200).json(updatedTag);
        });
      } else {
        res.status(404).json({
          error: "The specified tag could not be found."
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        error: "There was an error updating the specified tag."
      });
    });
});

// DELETE; remove tag
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db
    .remove(id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(500).json({
        error: "There was an error removing the specified tag."
      });
    });
});

module.exports = router;
