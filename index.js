const express = require('express');
const server = express();
const postDb = require('./data/helpers/postDb');
const tagDb = require('./data/helpers/tagDb');
const userDb = require('./data/helpers/userDb');
const cors = require('cors');

server.use(express.json());
server.use(cors());

server.get('/posts', (req, res) => {
  postDb
    .get()
    .then((posts) => {
      res.json(posts);
    })
    .catch(() => {
      res.status(500).json({ err: 'The posts info cannot be found.' });
    });
});

server.get('/posts/:id', (req, res) => {
  const { id } = req.params;
  postDb
    .get(id)
    .then((post) => {
      if (post === 0) {
        res.status(404).json({ message: 'The post doesnt exist' });
      } else {
        res.json(post);
      }
    })
    .catch(() => {
      res.status(500).json({ err: 'The posts info cannot be found.' });
    });
});

// server.get('/posts/:id/tags', (req, res) => {
//   const { id } = req.params;
//   postDb
//     .get(id)
//     .then((post) => {
//       if (post === 0) {
//         res.status(404).json({ message: 'The post doesnt exist' });
//       } else {
//         tagDb.getPostTags(id).then((tag) => {
//           res.status(201).json(tag);
//         });
//       }
//     })
//     .catch(() => {
//       res.status(500).json({ err: 'The posts info cannot be found.' });
//     });
// });

server.post('/posts', (req, res) => {
  const post = req.body;
  if (!post.userId || !post.text) {
    res.status(404).json({ errorMessage: 'Please provide user Id and text for the post.' });
  }
  postDb
    .insert(post)
    .then((post) => {
      res.status(201).json(post);
    })
    .catch(() => {
      res.status(500).json({ error: 'There was an error while saving the post to the database' });
    });
});

server.delete('/posts/:id', (req, res) => {
  const { id } = req.params;
  postDb
    .remove(id)
    .then((response) => {
      if (response === 0) {
        res.status(404).json({ message: 'The post with this specified ID doesnt exist' });
      } else {
        res.status(200).json(response);
      }
    })
    .catch(() => {
      res.status(500).json({
        error: 'The post could not be deleted :('
      });
    });
});

server.put('/posts/:id', (req, res) => {
  const { id } = req.params;
  const post = req.body;
  if (!post.userId || !post.text) {
    res.status(404).json({ errorMessage: 'Please provide user Id and text for the post.' });
  }

  postDb
    .get(id)
    .then((post) => {
      if (post === 0) {
        res.status(404).json({
          message: 'The post with this ID does not exist :/'
        });
      } else {
        postDb.update(id, post).then((id) => {
          res.status(200).json(id);
        });
      }
    })
    .catch(() => {
      res.status(500).json({ error: 'The post information could not be updated :(' });
    });
});

server.get('/users', (req, res) => {
  postDb
    .get()
    .then((users) => {
      res.json(users);
    })
    .catch(() => {
      res.status(500).json({ err: 'The user information could not be found :(' });
    });
});

server.listen(5000, () => console.log('\n=== API running... ===\n'));
