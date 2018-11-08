const express = require("express");
const router = express.Router();
const postsDb = require("../data/helpers/postDB");

/* ======= GET  ALL POSTS ====== */
router.get("/", (req, res) => {
  postsDb.get().then(posts => {
    res.status(200).json(posts);
  });
});

/* ======= GET POST BY ID ====== */
router.get("/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  postsDb
    .get(id)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "There was an error" });
    });
});

/* ======= NEW POST ====== */
router.post("/", (req, res) => {
  let newPost = req.body;
  console.log(newPost);

  if (!newPost.name) {
    res.status(400).json({ errorMessage: "Please add a Username" });
  } else {
    postsDb.insert(newPost).then(post => {
      res.status(201).json(post.id);
    });
  }
});

/* ======= EDIT POST ====== */
router.put("/:id", (req, res) => {
  postsDb
    .update(req.params.id, req.body)
    .then(count => {
      if (count) {
        res.status(200).json(count);
      } else {
        res.status(404).json({ errorMessage: "user not found" });
      }
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "err" });
    });
});

/* ======= DELETE POST ====== */
router.delete("/:id", (req, res) => {
  postsDb
    .remove(req.params.id)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "error deleting user" });
    });
});

module.exports = router;
