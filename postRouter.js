const express = require('express');

// db helper functions
const postdb = require("./data/helpers/postDb");

// init router
const postRouter = express.Router();

postRouter.get("/", (req, res) => {
  postdb
    .get()
    .then(posts => res.status(200).send(posts))
    .catch(err => res.status(500).send(err));
});

postRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  postdb
    .get(id)
    .then(post => res.status(200).send(post))
    .catch(err => res.status(500).send(err));
});

postRouter.get("/:id/tags", (req, res) => {
  const {id} = req.params;
  postdb.getPostTags(id)
    .then(tags => {
      if(tags.length < 1) {
        res.status(200).send(`No tags associated with posts.`);
        return;
      }
      res.status(200).send(tags);
    })
    .catch(err => res.status(500).send(err));
})

postRouter.post("/", (req, res) => {
  const { text, userId } = req.body;
  const newPost = { text, userId };
  console.log(req.body);
  postdb
    .insert(newPost)
    .then(post => {
      postdb
        .get()
        .then(posts => res.status(201).send(posts))
        .catch(err => res.status(500).send(err));
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
});

postRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  postdb
    .remove(id)
    .then(post =>
      res.status(200).send(`Post at id ${id} removed successfully.`)
    )
    .catch(err => res.status(500).send(err));
});

postRouter.put("/:id", (req, res) => {
  const { id } = req.params;
  const { text, userId } = req.body;
  const post = { text, userId, id };
  console.log(id);
  console.log(post);
  postdb
    .update(id, post)
    .then(updatedPost =>
      postdb
        .get(id)
        .then(foundPost => res.status(200).send(foundPost))
        .catch(err => res.status(500).send(err))
    )
    .catch(err => res.status(500).send(err));
});

module.exports = postRouter;