const express = require("express");
const router = express.Router();
const db = require("../helpers/tagDb.js");

const sendError = (statusCode, message, res) => {
  res.status(statusCode).json({ errorMessage: message });
  return;
};

router.get("/", (req, res) => {
  db
    .get()
    .then(tags => {
      res.json({ tags });
    })
    .catch(error => {
      sendError(500, "The tags information could no tbe retrieved", res);
      return;
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params; // pull id off of req.params;
  db
    .get(id) // invoke proper db.method(id) passing it the id.
    .then(tag => {
      if (tag.length === 0) {
        sendError(404, `Tag with id ${id} could not found`, res);
        return;
      }
      res.json({ tag });
    })
    .catch(error => {
      sendError(500, "Error looking up tag", res);
      return;
    });
});

router.post("/", (req, res) => {
  const { tag } = req.body;
  if (!tag) {
    sendError(400, "Must provide tag", res);
    return;
  }
  db
    .insert({ tag })
    .then(response => {
      db.get(response.id).then(tag => {
        res.json({ tag });
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
    .then(tag => {
      if (tag === 0) {
        sendError(
          404,
          `Tag with id ${id} could not found, can not delete it.`,
          res
        );
        return;
      }
      res.json({ tag });
    })
    .catch(error => {
      console.log(error);
      sendError(500, "Error deleting tag", res);
      return;
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { tag } = req.body;
  if (!tag) {
    sendError(400, "Must provide tag", res);
    return;
  }
  db
    .update(id, { tag })
    .then(response => {
      if (response == 0) {
        sendError(404, `tag with id ${id} could not found.`, res);
        return;
      }
      db.get(id).then(tag => {
        console.log(tag);
        if (tag.length === 0) {
          sendError(404, `tag with id ${id} could not found.`, res);
          return;
        }
        res.json({ tag });
      });
    })
    .catch(message => {
      sendError(400, message, res);
      return;
    });
});

module.exports = router;
