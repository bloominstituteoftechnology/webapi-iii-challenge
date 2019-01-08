const express = require("express");
const router = express.Router();

const users = require("../data/helpers/postDb");

const errorMaker = (code, message, res) => {
  res.status(code).json({ error: message });
};

router.get("/", (req, res) => {
  posts
    .get()
    .then(posts => res.status(200).json(posts))
    .catch(err => errorMaker(500, "Unable to reach server", res));
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  posts
    .get(id)
    .then(response => {
      if (response) {
        res.status(200).json(response);
      } else {
        return errorMaker(404, "There is no post with that id", res);
      }
    })
    .catch(err => errorMaker(500, "Unable to reach server", res));
});

router.post("/", (req, res) => {
  const newPost = req.body;

  if (newPost.userId) {
    users
      .get(newPost.userId)
      .then(response => {
        if (response) {
          posts.insert(newPost).then(response => res.status(201).json(newPost));
        } else {
          return errorMaker(404, "A user with that id does not exist", res);
        }
      })
      .catch(err => errorMaker(500, "Unable to reach server", res));
  } else {
    posts
      .insert(newPost)
      .then(response => {
        res.status(201).json(newPost);
      })
      .catch(err => errorMaker(500, "Unable to reach server", res));
  }
});

router.put("/:id", (req, res) => {
  const updated = req.body;
  const { id } = req.params;

  if (updated.userId) {
    users
      .get(updated.userId)
      .then(response => {
        if (response) {
          posts.get(id).then(post => {
            if (post) {
              posts.update(id, updated).then(response => res.status(200).json(updated));
            } else {
              return errorMaker(404, "A post with that ID does not exist", res);
            }
          });
        } else {
          return errorMaker(404, "A user with that ID does not exist", res);
        }
      })
      .catch(err => errorMaker(500, "Unable to reach server", res));
  } else {
    posts
      .get(id)
      .then(post => {
        if (post) {
          posts.update(id, updated).then(response => {
            res.status(200).json(updated);
          });
        } else {
          return errorMaker(404, "A post with that ID does not exist", res);
        }
      })
      .catch(err => errorMaker(500, "Unable to reach server", res));
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  posts
    .get(id)
    .then(response => {
      posts
        .remove(id)
        .then(info => res.status(200).json({ recordsDeleted: info }))
        .catch(err => {
          return res
            .status(404)
            .json({ errorMessage: "The post with the specified ID does not exist." });
        });
    })
    .catch(err => errorMaker(500, "Unable to reach server", res));
});

module.exports = router;
