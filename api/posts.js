const router = require('express').Router();
const db = require('../data/helpers/postDb');

/* Middleware */

const validatePost = (req, res, next) => {
  if (!req.body || !req.body.text) {
    res.status(404).json({ error: 'Post must have some text.' });
  } else if (!req.body.userId) {
    res.status(404).json({ error: 'No user found with the id for that post.' });
  } else {
    next();
  }
};

/* Posts DB requests */

const fetchPosts = (req, res) => {
  db.get()
    .then(posts => res.status(200).json(posts))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Error getting posts.' });
    });
};

router.get('/', fetchPosts);

router.get('/:postId', (req, res) => {
  db.get(req.params.postId)
  .then(post => {
    if (!post) res.status(404).json({ error: 'No post was found with the specified id.' });
    else res.status(200).json(post);
  })
  .catch(err => {
    console.error(err);
    res.status(500).json({ error: 'Error getting the post.' });
  });
});

router.get('/:postId/tags', (req, res) => {
  db.getPostTags(req.params.postId)
    .then(tags => {
      if (!tags) res.status(404).json({ error: 'No associated tags were found for the specified post.' });
      else res.status(200).json(tags);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Error getting tags for the specified post.' });
    });
});

router.delete('/:postId', (req, res) => {
  db.remove(req.params.postId)
    .then((success) => {
      if (!success) res.status(404).json({ error: 'No post was found with the specified id.' });
      else fetchPosts(req, res);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Error deleting the post.' });
    });
});

router.post('/', validatePost, (req, res) => {
  db.insert(req.body)
    .then(() => fetchPosts(req, res))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Error adding post.' });
    });
});

router.put('/:postId', validatePost, (req, res) => {
  db.update(req.params.postId, req.body)
    .then((success) => {
      if (!success) res.status(404).json({ error: 'No post was found with the specified id.' });
      else fetchPosts(req, res);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Error updating the post.' });
    });
});

module.exports = router;
