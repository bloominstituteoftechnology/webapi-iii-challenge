const express = require("express");

const Posts = require("./postDb");

const router = express.Router();

router.get("/", (req, res) => {
  Posts.get().then(post => {
    res.status(200).json(post);
  });
});

router.get("/:id", validatePostId, (req, res) => {
  res.status(200).json(req.post);
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Posts.remove(id)
    .then(post => {
      res.status(200).json({ message: "Post has been deleted" });
    })
    .catch(err => res.status(500).json({ message: "Post cannot be removed" }));
});

router.put("/:id", validatePostId, (req, res) => {
  // const id = req.params.id;
  // const post = req.body.text;
  // const user_id = req.body.user_id;

  console.log("req.post", req.post);
  console.log("req.body", req.body);

  if (!req.post.text) {
    return res.status(400).json({ message: "Must add a text" });
  } else if (!req.post) {
    return res
      .status(400)
      .json({ message: "The post with this specific ID does not exsist." });
  } else {
    Posts.update(req.params.id, { ...req.body, user_id: req.post.user_id })
      .then(post => {
        res.status(200).json(post);
      })
      .catch(err => {
        res
          .status(500)
          .json({ message: "The post information could not be modified." });
      });
  }
});

// custom middleware

function validatePostId(req, res, next) {
  const id = req.params.id;
  Posts.getById(id)
    .then(post => {
      if (post) {
        console.log("post", post);
        req.post = post;
        next();
      } else {
        res.status(400).json({ message: "invalid post id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "This id doesnt exsist" });
    });
}

module.exports = router;
