const express = require('express');
const router = express.Router();
const postDb = require('./data/helpers/postDb');
const capitalize = require('./middleware')

router.get('/', (req, res) => {
  postDb.get()
    .then((posts) => {
      res.json(posts)
    })
    .catch(err => {
      res.status(500).json({ error: "error getting posts" })
    })
})

router.get('/:id', (req, res) => {
  const id = req.params.id;
  postDb.get(id)
    .then((post) => {
      res.json(post);
    })
    .catch(err => {
      res.status(500).json({ error: "no post with this ID" })
    })
})

router.post('/', capitalize, (req, res) => {
  const post = req.body;

  if (post.userID && post.text) {
    postDb.insert(post)
      .then((post) => {
        res.json(`successfully inserted post with an post ID of ${post}`)
          .catch(err => {
            res.status(500).json({ message: "failed to insert post" })
          })
      });
  } else {
    res.status(400).json({ error: "missing user ID or contents" })
  }
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  postDb.remove(id)
    .then(numberRemoved => {
      res.json({ message: `succesully deleted ${numberRemoved} records` })
    })
    .catch(err => {
      res.status(500).json({ error: "failed to delete post" })
    })
})

router.put('/:id', (req, res) => {
  const post = req.body;
  const { id } = req.params;
  if (post.userID && post.text) {
    postDb.update(id, post)
      .then(count => {
        if (count) {
          postDb.get(id).then(post => {
            res.json(post)
          })
        } else {
          res.status(500).json({ message: "failed to update post" })

        }
      });

  } else {
    res.status(400).json({ message: "missing ID or content" })
  }
})





module.exports = router;