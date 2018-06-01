const express = require('express');
const tagsDB = require('../data/helpers/tagDb');
const router = express.Router();

const clickWatchLogger = require("../data/middleware/");

const sendError = (status, message, res) => {
  res.status(status).json({ errorMessage: message });
};

router.post('/', clickWatchLogger, (req, res) => {
  const newTag = req.body;

  if (!newTag.tag || newTag.tag.length < 0 || newTag.tag.length > 80) {
    sendError(
      404,
      "Tag must be unique with 1 - 80 characters.",
      res
    );
    return;
  } else {
    tagsDB
      .insert(newTag)
      .then(tag => {
        res.json(tag);
      })
      .catch(error => {
        sendError(
          500,
          "Something went terribly wrong!",
          res
        );
        return;
      });
  };
});

router.get('/', clickWatchLogger, (req, res) => {
  tagsDB
    .get()
    .then(tags => {
      res.json(tags);
    })
    .catch(error => {
      sendError(
        500,
        "Something went terribly wrong!",
        res
      );
    });
});

router.get('/:id', clickWatchLogger, (req, res) => {
  const { id } = req.params;

  tagsDB
    .get(id)
    .then(tag => {
      if (tag) {
        res.json(tag);
      } else {
        sendError(
          404,
          "Tag can not be found.",
          res
        );
        return;
      }
    })
    .catch(error => {
      sendError(
        500,
        "Something went terribly wrong!",
        res
      );
    });
});

router.put('/:id', clickWatchLogger, (req, res) => {
  const { id } = req.params;
  const update = req.body;

  if (!update.tag || update.tag.length < 0 || update.tag.length > 80) {
    sendError(
      400,
      "Tag must be unique with 1 - 80 characters.",
      res
    );
    return;
  } else {
    tagsDB
      .update(id, update)
      .then(result => {
        if (result === 0) {
          sendError(
            404,
            "Unable to find tag in server.",
            res
          );
          return;
        } else {
          res.json(update);
        }
      })
      .catch(error => {
        sendError(
          500,
          "Something went terribly wrong!",
          res
        );
      });
  };
});

router.delete('/:id', clickWatchLogger, (req, res) => {
  const { id } = req.params;

  tagsDB
    .get(id)
    .then(destroy => {
      tagsDB
        .remove(id)
        .then(result => {
          if (result) {
            res.json(destroy);
          } else {
            sendError(
              404,
              "Cannot find tags to destroy!",
              res
            );
            return;
          }
        })
    })
    .catch(error => {
      sendError(
        500,
        "Something went terribly wrong!",
        res
      );
    });
});

module.exports = router;