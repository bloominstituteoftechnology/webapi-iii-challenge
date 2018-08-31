const express = require("express");
const db = require("../data/helpers/postDb");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await db.get();
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ message: "error getting post" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await db.get(id);
    if (response) {
      res.status(200).json(response);
    } else {
      res.status(404).json({ message: "no post with that id" });
    }
  } catch (err) {
    res.status(500).json({ message: "post not found" });
  }
});

router.post("/", async (req, res) => {
    const post = req.body;
    try {
        if (post.text && post.userId) {
            const response = await db.insert(post);
            res.status(200).json({ message: "created" });
        } else {
            res.status(400).json({ message: "wrong" });
        }
    } catch (err) {
        res.status(500).json({ message: "complete failure" });
    }
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try{
        const response = await db.remove(id);
        if (response) {
            return res.status(200).json({ message: "deleted" });
        } else {
            return res.status(404).json({ message: "no post with that id" });
        }
    } catch (err) {
        res.status(500).json({ message: "complete failure" });
    }
});

router.put("/:id", async (req, res) => {
    const post = req.body;
    const {id} = req.params;
    if (!post.userId && !post.text)
        return res.status(400).json({ message: "wrong" });
    try {
        let response = await db.update(id, post);
        if (response) {
            return res.status(200).json({ message: "updated" });
        } else {
            return res.status(404).json({ message: "not post with that id" });
        }
    } catch (err) {
        res.status(500).json({ message: "complete failure" });
    }
});

module.exports = router;
