const express = require("express");

const router = express.Router();

const postDb = require("../data/helpers/postDb.js");

router.get("/", (req, res) => {
  postDb
    .get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  postDb
    .get(id)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(error => {
      res.status(404)
      .json({ message: "The user with the specified ID does not exist." });
    });
});

router.get("/:id/tags", (req, res) => {
  const { id } = req.params;
  postDb
    .getPostTags(id)
    .then(tags => {
      res.status(200).json(tags);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post("/", (req, res) => {
  postDb
    .insert(req.body)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.put("/:id", (req, res) => {
    const { id } = req.params;
    const update = req.body;
  
    postDb
      .update(id, update)
      .then(count => {
        if (count > 0) {
          postDb
            .get(id)
            .then(updatedPost => {
              res.status(200).json(updatedPost[0]);
            })
            .catch();
        } else {
          res
            .status(404)
            .json({ message: "The post with the specified ID does not exist." });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  postDb
    .get(id)
    .then(response => {
      post = { ...response[0] };
      postDb
        .remove(id)
        .then(response => {
          res.status(200).json(post);
        })
        .catch(error => {
          res.status(404).json(error);
        });
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
