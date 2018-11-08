const express = require("express");
const postDb = require("../data/helpers/postDb");
const router = express.Router();

const utils = require("../utils");

router.get("/", (req, res) => {
  postDb
    .get()
    .then(posts => {
      utils.sendUserSuccess(res, 200, posts);
    })
    .catch(err => {
      sendUserError(
        500,
        "The posts' information could not be retrieved.",
        res,
        err
      );
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  postDb
    .get(id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ error: `Post id ${id} not found` });
      }
    })
    .catch(err => {
      sendUserError(
        500,
        "The post's information could not be retrieved.",
        res,
        err
      );
    });
});

router.post("/", (req, res) => {
  const { userId, text } = req.body;
  const newPost = { userId, text };
  if (!newPost) {
    res.status(400).json({ message: "Please provide text and userId." });
    return;
  }
  postDb
    .insert(newPost)
    .then(post => {
      res.status(201).json({ message: `Added post with id of ${post.id}.` });
    })
    .catch(err => {
      sendUserError(
        500,
        "There was an error while saving the post to the database",
        res,
        err
      );
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const newPost = { text };
  postDb.get(id).then(post => {
    if (post) {
      postDb
        .update(id, newPost)
        .then(count => {
          res
            .status(200)
            .json(`Updated ${count} post. Post id ${id} successfully updated.`);
        })
        .catch(err =>
          sendUserError(
            500,
            "The post information could not be modified.",
            res,
            err
          )
        );
    } else {
      res.status(404).json({ error: `Post id ${id} not found` });
    }
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  postDb.get(id).then(post => {
    if (post) {
      postDb
        .remove(id)
        .then(count => {
          res
            .status(200)
            .json(`Deleted ${count} post. Post id ${id} successfully deleted.`);
        })
        .catch(err =>
          sendUserError(
            500,
            "The post information could not be deleted.",
            res,
            err
          )
        );
    } else {
      res.status(404).json({ error: `Post id ${id} not found` });
    }
  });
});

module.exports = router;
