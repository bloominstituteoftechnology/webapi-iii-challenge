const tagDb = require("../data/helpers/tagDb");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  tagDb
    .get()
    .then(tags => {
      res.status(200).json(tags);
    })
    .catch(err => {
      res.status(500).json({ error: "could not retrieve tags" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  tagDb
    .get(id)
    .then(tag => {
      res.status(200).json(tag);
    })
    .catch(err => {
      res.status(500).json({ error: "could not retrieve tag" });
    });
});

router.post("/", async (req, res) => {
  const newTag = req.body;
  if (newTag.tag === "" || !newTag.tag) {
    res.status(400).json({ error: "tag must exist and include characters" });
  } else if (newTag.tag.length > 18) {
    res.status(400).json({ error: "tag must not exceed 18 characters" });
  } else {
    try {
      const tagging = await tagDb.insert(newTag);
      const tagged = await tagDb.get(tagging.id);
      res.status(201).json(tagged);
    } catch (err) {
      res.status(500).json({ error: "trouble adding tag" });
    }
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedTag = req.body;
  tagDb.get(id).then(async tag => {
    if (!tag) {
      res.status(404).json({ error: "no tag exists with the specified id." });
    } else {
      if (updatedTag.tag === "" || !updatedTag.tag) {
        res
          .status(400)
          .json({ error: "tag must exist and include characters" });
      } else if (updatedTag.tag.length > 12) {
        res.status(400).json({ error: "tag must not exceed 12 characters" });
      } else {
        try {
          const updating = await tagDb.update(id, updatedTag);
          const updated = await tagDb.get(id);
          res.status(201).json(updated);
        } catch (err) {
          res.status(500).json({ error: "trouble adding tag" });
        }
      }
    }
  });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deleted = await tagDb.get(id);

  tagDb.get(id).then(tag => {
    if (tag) {
      tagDb
        .remove(id)
        .then(count => {
          res.status(200).json(deleted);
        })
        .catch(err => {
          res.status(500).json({ error: "trouble deleting tag" });
        });
    } else {
      res.status(404).json({ error: "tag does not exist" });
    }
  });
});

module.exports = router;
