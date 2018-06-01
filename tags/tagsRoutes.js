const express = require('express');
const tagsDB = require('../data/helpers/tagDb');
const router = express.Router();

const { clickWatchLogger } = require("../data/middleware");

const sendError = (status, message, res) => {
  res.status(status).json({ errorMessage: message });
};

router.post('/', clickWatchLogger, (req, res) => {
  const newTag = req.body;

  if (!newTag.tag && !newTag.tag.length > 0 && !newTag.tag.length < 80) {
    sendError(404, "Tag must be unique with 1 - 80 characters.");
    return;
  } else {
    tagDB
      .insert(newTag)
      .then(tag => {
        res.json(newTag);
      })
      
      .catch (error => {
        sendError(500, "Something went terribly wrong!", res);
    })
  }
})

module.exports = router;