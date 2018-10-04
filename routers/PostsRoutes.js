const express = require("express");
const router = express.Router();

const postDb = require("../data/helpers/postDb.js");

router.get("/api/posts", (req, res) => {
  res.json(postDb.get());
});

router.post("/api/posts", (req, res) => {
  const newPost = { text: req.body.text, userId: req.body.userId };
  console.log(newPost);
  const promise = postDb.insert(newPost);
  promise
    .then(idObj => {
      if (!idObj) {
        res.status(500).json({ error: "There was an error creating the post" });
      } else {
        postDb
          .get(idObj.id)
          .then(post => res.status(200).json(post))
          .catch(err =>
            res
              .status(500)
              .json({ error: "There was an error creating the user" })
          );
      }
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;
