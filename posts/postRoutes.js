const express = require("express");
const postModel = require("./postModel.js");

const router = express.Router();

// IMPORTANT "/users" turns into "/" you link url
// on index.js when using express.Router()

// GET REQUESTS
router.get("/", (req, res) => {
  postModel
    .get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  postModel
    .get(id)
    .then(post => {
      if (post.length === 0) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        return res.status(200).json({ post });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});
// end GETS //

// POST REQUEST //
//// MUST BE ID OF EXISTING USER ////
router.post("/", async (req, res) => {
  const post = req.body;
  if (!post.userId || !post.text) {
    return res.status(400).json({
      errorMessage: "Please provide the correct User ID and text.",
    });
  } else {
    try {
      const response = await postModel.insert(post);
      res.status(201).json({ message: "New post created successfully." });
    } catch (err) {
      res.status(500).json({
        error: "There was an error while saving the post to the database.",
      });
    }
  }
});
// end POST //

// DELETE REQUEST //
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await postModel.remove(id);
    if (response === 0) {
      return res.status(404).json({
        message: "The post with the specified ID does not exist.",
      });
    } else {
      return res.status(200).json({ message: "Post deleted successfully." });
    }
  } catch (err) {
    return res.status(500).json({
      error: "The post could not be removed.",
    });
  }
});
// end DELETE //

// PUT REQUEST //
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const post = req.body;
  if (!post.userId || !post.text) {
    return res.status(400).json({
      errorMessage: "Please provide the correct User ID and text.",
    });
  } else {
    postModel
      .update(id, post)
      .then(count => {
        if (count) {
          res.status(200).json({ message: "Post successfully modified." });
        } else {
          res.status(404).json({
            message: "The user with the specified ID does not exist.",
          });
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: "The post information could not be modified." });
      });
  }
});
// end PUT //

module.exports = router;
