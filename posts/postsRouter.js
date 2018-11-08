const express = require('express');
// database
const postDb = require('../data/helpers/postDb');

const router = express.Router();

// ================ ENDPOINTS ================

// GET posts
router.get('/', (_, res) => {
  postDb.get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res.status(500).json({ message: "500 error" });
    });
});

// GET post by id
router.get('/:id', (req, res) => {
  postDb.get()
    .then(posts => {
      const { id } = req.params;
      const post = posts.find(post => `${post.id}` === id);

      if (!post) {
        return res.status(404).json({ message: "404 Post Not Found" });
      }

      postDb.get(id)
        .then(post => {
          res.status(200).json(post);
        })
        .catch(error => {
          res.status(500).json({ message: "500 error" });
        });
    })
    .catch(error => {
      res.status(500).json({ message: "500 error" });
    });
});

// CREATE new post
router.post('/', (req, res) => {
  const { userId, text } = req.body;

  postDb.insert({ userId, text })
    .then(newPost => {
      res.status(201).json(newPost);
    })
    .catch(error => {
      res.status(500).json({ message: "500 error to create post" })
    })
});

// UPDATE post
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const text = req.body;
  console.log(text)

  postDb.update(id, text)
    .then(count => {
      if (count) {
        res.status(200).json({ message: `${count} post(s) updated` });
      } else {
        res.status(404).json({ message: "post ID does not exist" })
      }
    })
    .catch(error => {
      res.status(500).json({ message: error });
    })
});

// DELETE a post
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  postDb.remove(id)
    .then(count => {
      if (count) {
        res.status(200).json({ message: `${count} post(s) deleted` });
      } else {
        res.status(404).json({ message: "post ID does not exist" })
      }
    })
    .catch(error => {
      res.status(500).json({ message: error })
    })
});

module.exports = router;
