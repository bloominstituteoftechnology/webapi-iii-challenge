const express = require("express");
const postDB = require("../data/helpers/postDb");
const userDB = require("../data/helpers/userDb");
const router = express.Router();

router.get("/", (req, res) => {
  postDB
    .get()
    .then(posts => {
      res.json(posts);
    })
    .catch(err => {
      res.status(500).json({
        message: "unable to find posts"
      });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  postDB
    .get(id)
    .then(post => {
      res.json(post);
    })
    .catch(err => {
      res.status(404).json({
        message: "post not found"
      });
    });
});

router.post("/:id", (req, res) => {
  const { id } = req.params;
  const newPost = req.body;
  newPost.userId = id;
  userDB
    .get(id)
    .then(user => {
      if (user) {
        postDB
          .insert(newPost)
          .then(id => {
            res.json({
              message: `post with id ${id.id} created`
            });
          })
          .catch(err => {
            res.json({
              message: "could not add post"
            });
          });
      }
    })
    .catch(err => {
      res.json({
        message: "no id found"
      });
    });
});

router.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const updatedPost = req.body;
  postDB
    .update(id, updatedPost)
    .then(count => {
      if (count === 1) {
        res.json({
          message: "post updated successfully"
        });
      } else {
        res.json({
          message: "post did not update"
        });
      }
    })
    .catch(err => {
      res.json({
        message: "cannot update post"
      });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  postDB
    .remove(id)
    .then(count => {
      if (count > 0) {
        res.json({
          message: `deleted ${count} records successfully`
        });
      } else {
        res.json({
          message: "post not deleted"
        });
      }
    })
    .catch(err => {
      res.send(err);
    });
});
module.exports = router;
