const express = require('express');

const router = express.Router();

const db = require('../data/helpers/postDb.js');

router.get('/', (req, res) => {
  db
    .get()
    .then(posts => {
      res.json(posts);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// router.get('/:id', (req, res) => {
//   console.log('inside it');
//   const { id } = req.params;
//   const postIds = [];

//   db
//     .get()
//     .then(posts => {
//       posts.forEach(post => {
//         postIds.push(post.id);
//       });
//       if (postIds.includes(id)) {
//         db
//           .get(id)
//           .then(post => {
//             console.log('inside the postssssss');

//             res.json(post);
//           })
//           .catch(error => {
//             res.status(500).json(error);
//           });
//       }
//     })
//     .catch(error => res.status(500).json({ error }));
// });

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const postIDs = [];

  db.get().then(posts => {
    posts.forEach(post => {
      postIDs.push(post.id);
    });

    if (postIDs.includes(Number(id))) {
      db
        .get(id)
        .then(post => {
          res.json(post);
        })
        .catch(error => {
          res.status(500).json(error);
        });
    } else {
      res.status(404).json({ message: 'Post does not exist with that ID.' });
    }
  });
});

// something here and less than 128ch. no duplicates.
router.post('/', (req, res) => {
  const post = req.body;
  console.log(post);
  const postsList = [];
  db
    .get()
    .then(posts => {
      posts.forEach(post => {
        postsList.push(post.text);
      });
      if (!post.text) {
        res.status(400).json({ error: 'Text Required' });
      } else if (post.text.length > 128) {
        res.status(400).json({ error: 'Max length 128 characters' });
      } else if (postsList.includes(post.text)) {
        res.status(400).json({ error: 'Post already exists' });
      } else {
        db
          .insert(post)
          .then(post => {
            res.json(post);
          })
          .catch(error => {
            console.log('in the catch');
            res.status(500).json(error);
          });
      }
    })
    .catch(error => res.status(500).json({ error }));
});

router.get('/:id/tags', (req, res) => {
  const { id } = req.params;

  db
    .getPostTags(id)
    .then(tags => {
      if (!tags[0]) {
        res
          .status(200)
          .json({ message: 'This post does not contain any tags.' });
      } else {
        res.json(tags.map(tag => tag.tag));
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const post = req.body;
  if (!post.text) {
    res.status(400).json({ error: 'Text Required' });
  } else if (post.text.length > 128) {
    res.status(400).json({ error: 'Max length 128 characters' });
  } else {
    db
      .update(id, post)
      .then(count => {
        if (count > 0) {
          db
            .get(id)
            .then(post => {
              res.json(post);
            })
            .catch(error => {
              res.status(500).json(error);
            });
        } else {
          res.status(404).json({ errorMessage: 'Post not found' });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
  }
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db
    .remove(id)
    .then(count => {
      if (count > 0) {
        db
          .get()
          .then(post => {
            res.json(post);
          })
          .catch(error => {
            res.status(500).json(error);
          });
      } else {
        res.status(404).json({ errorMessage: 'Post not found' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
