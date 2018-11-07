const express = require('express');

const postDb = require('../data/helpers/postDb.js');

const router = express.Router();

router.get('/', (req, res) => {
    postDb.get().then(posts => {
        console.log('\n*** post **', posts);
        res.status(200).json(posts);
    })
    .catch(err => res.status(500).json({ error: "The information of posts could not be retrieved. "}))
})

router.get('/:postId', (req, res) => {
    const { postId } = req.params;
    postDb.get(postId)
    .then(post => {
        if (!post) {
            res.status(404).json({ error: "The post with this ID does not exist."})
        }
        res.status(200).json(post);
    })
    .catch(err => res.status(500).json({ error: "This post information could not be retrieved. "}))
})

router.post('/', (req, res) => {
    const { text, userId } = req.body;
    const newPost = { text, userId };
    postDb.insert(newPost)
    .then(postId => {
        const { id } = postId;
        postDb.get(id).then(post => {
            if (!post) {
                res.status(400).json({ error: "Please provide a text and user id for this post." });
            }
            res.status(201).json(post);
        });
    })
    .catch(err => { res.status(500).json({ error: "The post you added could not be saved." });
    })
});

router.delete('/:postId', (req, res) => {
    const { postId } = req.params;
    if (!postId) {
      res.status(404).json({ message: "The post with this ID does not exist." });
    }
    postDb.remove(postId)
      .then(removedPost => {
        res.status(200).json(removedPost);
      })
      .catch(err => { res.status(500).json({ error: "This post could not be deleted."});
      });
  })

  router.put('/:postId', (req, res) => {
    const postId = req.params.postId;
    const { text, userId } = req.body;
    const newPost = { text, userId };
    if (!postId) {
      res.status(404).json({ message: "The post with this ID does not exist." });
    }
    else if (!newPost) {
      res.status(400).json({ errorMessage: "Please provide text and a user id for this post." });
    }
    postDb.update(postId, newPost)
      .then(post => {
        res.status(200).json({ message: "The post has been updated."});
      })
      .catch(err => { res.status(500).json({ error: "The post information could not be updated."});
      });
});

module.exports = router;