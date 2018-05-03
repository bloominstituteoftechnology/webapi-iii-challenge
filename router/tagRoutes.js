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
    .then(tagFound => {
      if (tagFound.length === 0) {
        res.status(404).json({ message: "tag is not found. Try again." });
      } else {
        res.json(tagFound[0]);
      }
    })
    .catch(err => {
      res.status(500).json({ error: "not working" });
    });
});

// router GET, find by ID first, then return tag with tags
router.get("/:id/tags", (req, res) => {
  const id = req.params.id;
  db
    .gettagTags(id)
    .then(user => {
      if (user.length === 0) {
        res.status(404).json({ message: "tag is not found. Try again." });
      } else {
        res.json(user[0]);
      }
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

// http://localhost:5000?id=1 // for just using req.query
// write it using an URL parameter instead /:id

router.delete("/:id", (req, res) => {
  const id = req.param.id;
  
  db.get(id).then(tagFound => {
    let tag = { ...tagFound[0] };
    db
      .remove(id)
      .then(response => {
        res.status(200).json(tag);
      })
      .catch(error => {
        res.status(500).json({ error: "Nothing to delete" });
      });
  });
});

router.put("/", (req, res) => {
  const id = req.param.id;
  const updatedtag = req.body;

  db
    .update(id, updatedtag)
    .then(response => {
      if (response > 0) {
        db.get(id).then(tag => {
          res.status(200).json(tag[0]);
        });
      } else {
        res.staus(404).json({ msg: "tag is not found" });
      }
    })
    .catch(error => {
      res.status(500).json({ error: "Cannot update this user" });
    });
});

module.exports = router;
