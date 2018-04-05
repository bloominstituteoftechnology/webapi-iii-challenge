const express = require('express');

const postsRouter = express.Router();

const db = require('../data/helpers/postDb.js');

postsRouter.get('/', (req, res) => {
  db
    .get()
    .then(posts => {
      res.json(posts);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

postsRouter.get('/:id', (req, res) => {
  const { id } = req.params;

  db
    .get(id)
    .then(posts => {
      res.json(posts);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

postsRouter.post('/', (req, res) => {
  const post = req.body;
  db
    .insert(post)
    .then(response => {
      res.status(201).json(response);
    })
    .catch(error => {
      res.status(500).json({
        error: 'There was an error while saving the post to the database'
      });
    });
});

postsRouter.delete('/:id', (req, res) => {
  const { id } = req.params;
  let post;

  db
    .get(id)
    .then(response => {
      post = { ...response[0] };

      db
        .remove(id)
        .then(response => {
          res.status(200).json(post);
        })
        .catch(error => {
          res.status(500).json(error);
        });
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

postsRouter.put('/:id', (req, res) => {
  const { id } = req.params;
  const update = req.body;

  db
    .update(id, update)
    .then(count => {
      if (count > 0) {
        db.get(id).then(updatedPosts => {
          res.status(200).json(updatedPosts);
        });
      } else {
        res
          .status(404)
          .json({ message: 'The post with that ID does not exist.' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

postsRouter.get('/:postId/tags', (req, res) => {
  const { postId } = req.params;
  db
    .getPostTags(postId)
    .then(postTags => {
      res.json(postTags);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = postsRouter;
