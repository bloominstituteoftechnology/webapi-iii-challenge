const router = require('express').Router();

const Posts = require("./postDb");


router.get('/', (req, res) => {
    Posts.get()
    .then(posts => res.status(200).json(posts))
    .catch( err => res.status(500).json({ error: "Failed to retrieve all posts." }))
});

router.get('/:id', validatePostId, (req, res) => res.status(200).json(req.post));

router.delete('/:id', validatePostId, (req, res) => {
    const id = req.params.id;

    Posts.remove(id)
    .then(deleted => {
        deleted > 0
        ? res.status(200).json(deleted)
        : res.status(404).json({ message: `Could not find a post with an ID of ${id}.` })
    })
    .catch(err => res.status(500).json({ error: `Failed to remove post with ID of ${id}.` }))
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const updatedInfo = req.body;

    if (!updatedInfo.text) res.status(400).json({ errorMessage: "Please provide a text property in the object." })

    Posts.update(id, updatedInfo)
    .then(updated => {
        if (updated) {
            Posts.getById(id)
            .then(post => res.status(200).json(post))
        } else res.status(404).json({ message: `Could not find a post with an ID of ${id}.` })
    })
    .catch(err => res.status(500).json({ error: `Failed to retrieve a post with ID of ${id}.` }))
});

// custom middleware

function validatePostId(req, res, next) {
  const id = req.params.id;

  Posts.getById(id)
  .then(post => {
      if (post) {
          req.post = post;
          next();
      } else res.status(404).json({ errorMessage: `Unable to locate a post with ID of ${id}.` })
  })
  .catch(err => res.status(500).json({ error: `Failed to locate post with ID of ${id}.` }))
};

module.exports = router;