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

server.get('/api/posts', (req, res) => {//get all posts

  postDb.get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res.status(500)
        .json({ error: "The posts could not be retrieved." })
    })

});
server.get('/api/posts/:id', (req, res) => {//get posts by id
  const id = req.params.id;
  postDb.get(id)//req.params.id
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
server.post('/api/posts', (req, res) => {//add post
  const post = req.body
  postDb.insert(post)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res.status(500)
        .json({ error: "post not added." })
    })

});

server.put('/api/posts/:id', (req, res) => {//update post
  const post = req.body
  const id = req.params.id;
  postDb.update(id, post)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res.status(500)
        .json({ error: "Post not updated." })
    })

});
server.delete('/api/posts/:id', (req, res) => {//delete posts by id
  const { id } = req.params;
  // posts = posts.filter(p => p.id != id)
  postDb.remove(id)
    .then(posts => {
      if (posts === 0) {
        res.status(404)
        .json({ error: "The post with the specified ID does not exist." })
      }
      res.status(200).json(posts)
    }).catch(error => {
      res.status(500)
        .json({ error: "error 2." })
    });
})
server.get('/api/posttags/:id', (req, res) => {//get post tags by id
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


server.get('/api/users', (req, res) => {// get all users

  userDb.get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res.status(500)
        .json({ error: "The users information could not be retrieved." })
    })

});
server.get('/api/users/:id', (req, res) => {//get user by id
  const id = req.params.id;
  userDb.get(id)
    .then(posts => {
      if (posts.length === 0) {
        res.status(404)
          .json({ error: "error1." })
      }
      res.status(200).json(posts)
    }).catch(error => {
      res.status(500)
        .json({ error: "missing user." })
    });

});
server.post('/api/users', (req, res) => {//add user
  user = req.body
  userDb.insert(user)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res.status(500)
        .json({ error: "User not added." })
    })

});
server.put('/api/users/:id', (req, res) => {//update user
  const user = req.body
  const id = req.params.id;
  userDb.update(id, user)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res.status(500)
        .json({ error: "User not updated." })
    })

});
server.delete('/api/users/:id', (req, res) => {//delete user
  const { id } = req.params;
  // posts = posts.filter(p => p.id != id)
  userDb.remove(id)
    .then(posts => {
      if (posts === 0) {
        res.status(404)
        .json({ error: "The user with the specified ID does not exist." })
      }
      res.status(200).json(posts)
    }).catch(error => {
      res.status(500)
        .json({ error: "error 2." })
    });
})

server.get('/api/userposts/:id', (req, res) => {//get posts of user
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

server.get('/api/tags', (req, res) => {//get tags

  tagDb.get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res.status(500)
        .json({ error: "The users information could not be retrieved." })
    })

});
server.get('/api/tags/:id', (req, res) => {//get tags by id
  const id = req.params.id;
  tagDb.get(id)
    .then(posts => {
      if (posts.length === 0) {
        res.status(404)
          .json({ error: "missing tag." })
      }
      res.status(200).json(posts)
    }).catch(error => {
      res.status(500)
        .json({ error: "The tag with the specified tagid do not exist." })
    });

})
server.post('/api/tags', (req, res) => {//add tag
  const tag = req.body
  tagDb.insert(tag)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res.status(500)
        .json({ error: "tag not added." })
    })

});

server.put('/api/tags/:id', (req, res) => {//update tag
  const tag = req.body
  const id = req.params.id;
  tagDb.update(id, tag)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res.status(500)
        .json({ error: "tag not updated." })
    })

});
server.delete('/api/tags/:id', (req, res) => {//delete tags by id
  const { id } = req.params;
  // posts = posts.filter(p => p.id != id)
  tagDb.remove(id)
    .then(posts => {
      if (posts === 0) {
        res.status(404)
        .json({ error: "The post with the specified ID does not exist." })
      }
      res.status(200).json(posts)
    }).catch(error => {
      res.status(500)
        .json({ error: "error 2." })
    });
})


server.listen(6000, () => console.log('API running on port 6000'));

