const express = require("express");

const Posts = require("./postDb.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const posts = await Posts.get();
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "unable to retrive post"
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const posts = await Posts.getById(req.params.id);

    if (posts) {
      res.status(200).json(posts);
    } else {
      res.status(404).json({ message: "post not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "unable to retrive post"
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const posts = await Posts.remove(req.params.id);
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "unabelt to remove post"
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const posts = await Posts.update(req.params.id, req.body);
    if (posts) {
      res.status(200).json(posts);
    } else {
      res.status(404).json({ message: "The post could not be found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "error updating the hub"
    });
  }
});

// custom middleware

function validatePostId(req, res, next) {
  
}

module.exports = router;
