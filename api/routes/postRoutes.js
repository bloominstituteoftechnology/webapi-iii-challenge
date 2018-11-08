const express = require("express");
const postDb = require("../../data/helpers/postDb");
const router = express.Router();

router.get("/", (req, res) => {
  postDb
    .get()
    .then(posts => {
      res.json(posts);
    })
    .catch(err => res.send({ error: "The posts could not be retrieved." }));
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  postDb
    .get(id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      console.log("Error: ", err);
      res.status(500).json({ error: "The post couldn't be retrieved" });
    });
});

router.post("/", async (req, res) => {
  if (!req.body.text) {
    return res
      .status(400)
      .json({ message: "Please provide contents for the post." });
  }
  try {
    let data = await postDb.insert(req.body);
    return res.status(201).json({
      id: data.id,
      text: req.body.text,
      user: req.body.userId
    });
  } catch (err) {
    res.status(500).json({
      error: "There was an error while saving the post to the database"
    });
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  postDb.get(id).then(post => {
    if (!post) {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    } else {
      postDb
        .remove(id)
        .then(post => {
          res.status(200).json({ message: "post was successfully deleted" });
        })
        .catch(err => {
          console.log("Error: ", err);
          res.status(500).json({ error: "The post could not be removed" });
        });
    }
  });
});

//updates the user and returns the updated user object
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const post = { text };

  if (!req.body.text) {
    return res.status(400).json({ message: "Can't be empty." });
  } else {
    postDb.get(id).then(post => {
      if (!post) {
        return res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    });
  }

  postDb
    .update(id, post)
    .then(res.status(200))
    .catch(err => {
      res.status(500).json({ error: "Didn't work, don't know why." });
    });

  postDb.get(id).then(post => {
    if (post) {
      res.status(200).json(post);
    }
  });
});

module.exports = router;
