const express = require('express');

const postsDB = require('../data/helpers/postDb');

const router = express.Router();

const clickWatchLogger = require("../data/middleware/");

const sendError = (status, message, res) => {
  res.status(status).json({ errorMessage: message });
};

router.post('/', clickWatchLogger, (req, res) => {
  const { id } = req.params;
  const newPost = req.body;

  if (!newPost.userId || newPost.text.length < 1) {
    sendError(400, "Missing required ID and/or text.", res);
    return;
  } else {
    postsDB
      .insert(newPost)
      .then(post => {
        res.json(newPost);
      })
      .catch(error => {
        sendError(500, "Something went terribly wrong!", res);
      });
  };
});

router.get('/', clickWatchLogger, (req, res) => {
  postsDB
    .get()
    .then(posts => {
      res.json(posts);
    })
    .catch(error => {
      sendError(500, "Something went terribly wrong!", res);
    });
});

// get posts by user tag id
router.get('/userPosts/:id', clickWatchLogger, (req, res) => {
  const { id } = req.params;

  postsDB
    .get(id)
    .then(post => {
      if (post) {
        postsDB.getPostTags(id)
          .then(postTags => {
            if (postTags.length === 0) {
              sendError(404, "No tags found for post.", res);
              return;
            } else {
              res.json(postTags);
            }
          })
      }
    })
    .catch(error => {
      sendError(500, "Something went terribly wrong!", res);
    });
});

// get posts by post id
router.get('/:id', clickWatchLogger, (req, res) => {
  const { id } = req.params;

  postsDB
    .get(id)
    .then(post => {
      if (post) {
        res.json(post);
      } else {
        sendError(404, "Post cannot be found.", res);
        return;
      }
    })
    .catch(error => {
      sendError(500, "Something went terribly wrong!", res);
    });
});

router.put('/:id', clickWatchLogger, (req, res) => {
  const { id } = req.params;
  const update = req.body;

  if (!update.userId || update.text.length === 0) {
    sendError(400, "User ID and text is required for post update.", res);
  } else {
    postsDB
      .update(id, update)
      .then(result => {
        if (result === 0) {
          sendError(404, "Cannot find post to update.", res);
          return;
        } else {
          res.json(update);
        }
      })
      .catch(error => {
        sendError(500, "Something went terribly wrong!", res);
      });
  };
});

router.delete('/:id', clickWatchLogger, (req, res) => {
  const { id } = req.params;

  postsDB
    .get(id)
    .then(post => {
      postsDB
        .remove(id)
        .then(result => {
          if (result === 0) {
            sendError(404, "Post could not be found for destruction.", res);
            return;
          } else {
            res.json(post);
          }
        })
        .catch(error => {
          sendError(500, "Something went terribly wrong!", res);
        });
    });
});

module.exports = router;