const express = require("express");

const router = express.Router();

const db = require("../data/helpers/tagDb");

router.get("/", (req, res) => {
  db
    .get()
    .then(tags => {
      res.send(tags);
    })
    .catch(error => {
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  db
    .get(id)
    .then(tags => {
      res.send(tags);
    })
    .catch(error => {
      res.status(500).json({ message: "cant find tags" });
    });
});

router.post("/", (req, res) => {
  const tags = req.body;
  db
    .insert(tags)
    .then(response => {
      res.status(201).send(response);
    })
    .catch(error => {
      res
        .status(500)
        .send({ message: "there was an error while saving the tags" });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  let tags;

  db
    .get(id)
    .then(response => {
      tags = { ...response[0] };
      db
        .remove(id)
        .then(response => {
          res.status(200).send(tags);
        })
        .catch(error => {
          res.status(500).send(error);
        });
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const update = req.body;

  let tags;

  db
    .update(id, update)
    .then(count => {
      if (count > 0) {
        db.findById(id).then(updatedTags => {
          res.status(200).send(updatedTags[0]);
        });
      } else {
        res
          .status(404)
          .send({ message: "The tag with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

module.exports = router;
