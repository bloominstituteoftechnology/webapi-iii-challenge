const postDb = require("../data/helpers/postDb.js");
const userDb = require("../data/helpers/userDb.js");
const express = require("express");
const router = express.Router();

router.get("/:id", (req, res) => {
  const { id } = req.params;
  postDb
    .get(id)
    .then(post => {
      if (post) {
        res.json(post);
      } else {
        res.status(404).json({ error: "post does not exist" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "post could not be retrieved." });
    });
});

router.get("/:id/tags", (req, res) => {
  const { id } = req.params;
  postDb
    .getPostTags(id)
    .then(tags => {
      if (tags) {
        res.json(tags);
      } else {
        res.status(404).json({ error: "post does not have tags" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "tags could not be retrieved." });
    });
});

router.post("/", async (req, res) => {
  const postBody = req.body;
  if (
    postBody.text === "" ||
    !postBody.text ||
    !(typeof postBody.text === "string" || postBody.text instanceof String)
  ) {
    res.status(400).json({
      error:
        "text must be included, must include characters, and must be a string"
    });
  } else if (!postBody.userId) {
    res.status(400).json({ error: "user id must be included" });
  } else {
    userDb.get(postBody.userId).then(async user => {
      if (!user) {
        res
          .status(400)
          .json({ error: "must include user id of existing user" });
      } else {
        try {
          const posting = await postDb.insert(postBody);
          const posted = await postDb.get(posting.id);
          res.status(201).json(posted);
        } catch (err) {
          res.status(500).json({ error: "trouble adding post" });
        }
      }
    });
  }
});

module.exports = router;
