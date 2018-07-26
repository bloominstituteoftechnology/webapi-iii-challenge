const express = require('express');
const postDb = require('./data/helpers/postDb.js');
const tagDb = require('./data/helpers/tagDb.js');
const userDb = require('./data/helpers/userDb.js');

// add your server code starting here
const server = express();
server.use(express.json());

server.get('/', (req, res) => {
  res.send('Hello World');
});

server.get('/api/posts', (req, res) => {

  postDb.get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res.status(500)
        .json({ error: "The posts could not be retrieved." })
    })

});
server.get('/api/posts/:id', (req, res) => {
  const postId = req.params.id;
  postDb.get(postId)//req.params.id
    .then(posts => {
      if (posts.length === 0) {
        res.status(404)
          .json({ error: "missing post." })
      }
      res.status(200).json(posts)
    }).catch(error => {
      res.status(500)
        .json({ error: "The posts with the specified postid do not exist." })
    });

})
server.get('/api/poststags/:id', (req, res) => {
  const postId = req.params.id;
  postDb.getPostTags(postId)//req.params.id
    .then(posts => {
      if (posts.length === 0) {
        res.status(404)
          .json({ error: "missing post tags." })
      }
      res.status(200).json(posts)
    }).catch(error => {
      res.status(500)
        .json({ error: "The posts with the specified postid do not exist." })
    });

})


server.get('/api/users', (req, res) => {

  userDb.get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res.status(500)
        .json({ error: "The users information could not be retrieved." })
    })

});
server.get('/api/userposts/:id', (req, res) => {
  const userId = req.params.id;
  userDb.getUserPosts(userId)//req.params.id
    .then(posts => {
      if (posts.length === 0) {
        res.status(404)
          .json({ error: "missing user." })
      }
      res.status(200).json(posts)
    }).catch(error => {
      res.status(500)
        .json({ error: "The posts with the specified userID do not exist." })
    });

})

server.get('/api/tags', (req, res) => {

  tagDb.get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res.status(500)
        .json({ error: "The users information could not be retrieved." })
    })

});


server.listen(6000, () => console.log('API running on port 6000'));

