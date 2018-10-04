const express = require("express");
const postDB = require("../data/helpers/postDb");
const router = express.Router();

// POST ROUTES
// get posts
router.get("/", (req, res) => {
  postDB
    .get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => res.status(500).json({ error: "ERROROROR" }));
});

//get single post
router.get("/:id", (req, res) => {
  postDB
    .getPostTags(req.params.id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => res.status(500).json({ error: "ERRORERROR" }));
});

//add post
router.post("/", (req, res) => {
  const { id, text, userId } = req.body;
  const newPost = { id, text, userId };
  postDB
    .insert(newPost)
    .then(post => {
      res.json(post);
    })
    .catch(err => res.status(500).json({ error: "ERRORERROR" }));
});

//delete post
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const foundPost = postDB.getPostTags(id);
  if (foundPost) {
    postDB
      .remove(id)
      .then(posts => {
        res.json(posts);
      })
      .catch(err => res.status(500).json({ error: "ERRORERROR" }));
  }
});

//edit user
router.put("/:id", (req, res) => {
  postDB
    .update(req.params.id, req.body)
    .then(posts =>
      res.json(posts).catch(err => res.status(500).json({ error: "ERROROROR" }))
    );
});

module.exports = router;
