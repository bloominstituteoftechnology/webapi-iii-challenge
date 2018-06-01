const express = require("express");
const router = express.Router();
const db = require("../helpers/postDb.js");

const sendError = (statusCode, message, res) => {
  res.status(statusCode).json({ errorMessage: message });
  return;
};

router.get("/", (req, res) => {
  db
    .get()
    .then(posts => {
      res.json({ posts });
    })
    .catch(error => {
      sendError(500, "The posts information could no tbe retrieved", res);
      return;
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  console.log(id)
  db
    .get(id) 
    .then(post => {
        console.log(post)
      if (post === 0) {
        sendError(404, `Post with id ${id} could not found`, res);
        return;
      }
      res.json({ post });
    })
    .catch(error => {
        console.log(error)
      sendError(500, "Error looking up post", res);
      return;
    });
});

router.get("/:postId/tags", (req, res) => {
  const { postId } = req.params;
  db
    .getPostTags(postId)
    .then(postId => {
      if (postId.length === 0) {
        sendError(404, `Post with that id could not found`, res);
        return;
      }
      res.json({ post });
    })
    .catch(error => {
      sendError(500, "Error looking up post", res);
      return;
    });
});

router.post("/", (req, res) => {
  const { text, userId } = req.body;
  console.log(req.body)
  if (!text || !userId) {
    sendError(400, "Must provide text and userId", res);
    return;
  }
  db
    .insert({ text, userId })
    .then(response => {
      //   res.status(201).send(response);
      //   console.log(response);
      db.get(response.id).then(post => {
        res.json({ post });
      });
    })
    .catch(error => {
      sendError(400, error, res);
      return;
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db
    .remove(id)
    .then(post => {
      if (post === 0) {
        sendError(
          404,
          `post with id ${id} could not found, can not delete it.`,
          res
        );
        return;
      }
      res.json({ post });
    })
    .catch(error => {
      console.log(error);
      sendError(500, "Error deleting post", res);
      return;
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { text, userId } = req.body;
  if (!text, !userId) {
    sendError(400, "Must provide text and userId", res);
    return;
  }
  db
    .update(id, { text, userId })
    .then(response => {
      if (response == 0) {
        sendError(404, `Post with id ${id} could not found.`, res);
        return;
      }
      db.get(id).then(post => {
        console.log(post);
        if (post.length === 0) {
          sendError(404, `Post with id ${id} could not found.`, res);
          return;
        }
        res.json({ post });
      });
    })
    .catch(message => {
      sendError(400, message, res);
      return;
    });
});

module.exports = router;
