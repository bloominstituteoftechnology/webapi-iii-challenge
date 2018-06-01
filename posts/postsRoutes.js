const express = require('express');

const postsDB = require('../data/helpers/postDb');

const router = express.Router();

const clickWatchLogger = require("../data/middleware/");

const sendError = (status, message, res) => {
  res.status(status).json({ errorMessage: message });
};

router.post('/', (req, res) => {
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

router.get('/', (req, res) => {
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
router.get('/userPosts/:id', (req, res) => {
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
router.get('/:id', (req, res) => {
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



module.exports = router;