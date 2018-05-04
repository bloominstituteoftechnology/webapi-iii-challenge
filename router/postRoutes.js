const express = require("express");

const db = require("../data/helpers/postDb");

const router = express.Router();

router.get("/", (req, res) => {
  db
    .get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db
    .get(id)
    .then(postFound => {
      // if (postFound.length === 0) {
      // res.status(404).json({ message: "Post is not found. Try again." });
      // } else {
      res.json(postFound);
      // }
    })
    .catch(err => {
      res.status(500).json({ error: "not working" });
    });
});

router.get("/:id/tags", (req, res) => {
  const id = req.params.id;
  db
    .getPostTags(id)
    .then(post => {
      if (post.length === 0) {
        res.status(404).json({ message: "Post is not found. Try again." });
      } else {
        res.json(post[0]);
      }
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

// router GET, find by ID first, then return post with tags

// router.get("/:id", (req, res) => {
//   const { id } = req.params;

//   db
//   .get(id)
//   .then(post => res.json(post))
//   .catch(error => console.log(error))
//   .catch(error => {
//     res.status(500).json({
//       error: "The posts information could not be retrieved, or doesn't exist"
//     });
//   });
// });

// router POST, insert post, then give response, which is id of the post
router.post("/", (req, res, next) => {
  const post = req.body;

  db
    .insert(post)
    .then(response => {
      res.status(201).json(response);
    })
    .catch(err => {
      res.status(500).json({ error: "Error; could not save post to database" });
      next(err);
    });
});

// http://localhost:5000?id=1 // for just using req.query
// write it using an URL parameter instead /:id

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  db.get(id).then(postFound => {
    let post = { ...postFound };
    db
      .remove(id)
      .then(response => {
        res.status(200).json(post);
      })
      .catch(error => {
        res.status(500).json({ error: "Nothing to delete" });

      });
  });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const updatedPost = req.body;

  db
    .update(id, updatedPost)
    .then(response => {
      if (response > 0) {
        db.get(id).then(post => {
          res.status(200).json(post);
        });
      } else {
        res.staus(404).json({ msg: "post is not found" });
      }
    })
    .catch(error => {
      res.status(500).json({ error: "Cannot update this post" });
    });
});

module.exports = router;
