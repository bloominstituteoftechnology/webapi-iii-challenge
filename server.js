const express = require('express');
const cors = require('cors');
const posts = require('./data/helpers/postDb.js');
const users = require('./data/helpers/userDb.js');
const tags = require('./data/helpers/tagDb.js');



const port = 5555;
const server = express();
server.use(express.json());
server.use(cors({ origin: 'http://localhost:3000' }));

const serverLogger = (req, res, next) => {
  console.log(`\n\n\nIncoming Request:\n\nurl: ${req.url}\n\nmethod: ${req.method}\n\nbody:`);
  console.log(req.body);
  next();
}

server.use(serverLogger)

const upperCaseTags = (req, res, next) => {
  if (req.body.tag) req.body.tag = req.body.tag.toUpperCase();
  next();
}

server.use(upperCaseTags);




server.post('/api/users', (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ errorMessage: "Please provide a name for the user." });
  }
  else {
    users
      .insert({ name })
      .then(response => {
        users.get(response.id)
          .then(user => {
            res.status(201).json({ user });
          });
      })
      .catch(error => {
        res.status(500).json({ errorMessage: "There was an error while saving the user to the database" });
      });
  }
});


server.get('/api/users', (req, res) => {
  users.get().then(users => {
    res.json({ users });
  })
  .catch(error => {
    res.status(500).json({ errorMessage: "The user could not be retrieved." });
  });
});

server.get('/api/users/:id', (req, res) => {
  const id = req.params.id;
  users
    .get(id)
    .then(user => {
      if (user) {
        res.json({ user });
      }
      else {
        res.status(404).json({ errorMessage: "The user with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res.status(500).json({ errorMessage: "The user could not be retrieved." });
    })
});


server.put('/api/users/:id', (req, res) => {
  const { name } = req.body;
  const id = req.params.id;
  if (!name) {
    res.status(400).json({ errorMessage: "Please provide a name for the user." });
  }
  else {
    users
      .update(id, { name })
      .then(success => {
        if (success) {
          users.get(id)
            .then(user => {
              res.json({ user });
            });
        }
        else {
          res.status(404).json({ errorMessage: "The user with the specified ID does not exist." });
        }
      })
      .catch(error => {
        res.status(500).json({ errorMessage: "The user information could not be retrieved." });
      })
  }
});


server.delete('/api/users/:id', (req, res) => {
  const id = req.params.id;

  users.get(id)
    .then((user) => {
      let deletedUser = user
      users
        .remove(id)
        .then(success => {
          if (success) {
            res.json({ deletedUser });
          }
          else {
            res.status(404).json({ errorMessage: "The user with the specified ID does not exist." });
          }
        })
        .catch(error => {
          res.status(500).json({ errorMessage: "The user could not be removed" });
        })
    });


});


server.post('/api/posts', (req, res) => {
  const { userId, text } = req.body;
  if (!userId || !text) {
    res.status(400).json({ errorMessage: "Please provide a user id and text for the post." });
  }
  else {
    posts
      .insert({ userId, text })
      .then(response => {
        posts.get(response.id)
          .then(post => {
            res.status(201).json({ post });
          });
      })
      .catch(error => {
        res.status(500).json({ errorMessage: "There was an error while saving the post to the database" });
      });
  }
});

server.get('/api/posts', (req, res) => {
  posts.get().then(post => {
    res.json({ post });
  })
  .catch(error => {
    res.status(500).json({ errorMessage: "The post could not be retrieved." });
  });
});

server.get('/api/posts/:id', (req, res) => {
  const id = req.params.id;
  posts
    .get(id)
    .then(post => {
      if (post) {
        res.json({ post });
      }
      else {
        res.status(404).json({ errorMessage: "The post with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res.status(500).json({ errorMessage: "The post could not be retrieved." });
    })
});

server.put('/api/posts/:id', (req, res) => {
  const { userId, text } = req.body;
  const id = req.params.id;
  if (!userId || !text) {
    res.status(400).json({ errorMessage: "Please provide a user id and text for the post." });
  }
  else {
    posts
      .update(id, { userId, text })
      .then(success => {
        if (success) {
          posts.get(id)
            .then(post => {
              res.json({ post });
            });
        }
        else {
          res.status(404).json({ errorMessage: "The post with the specified ID does not exist." });
        }
      })
      .catch(error => {
        res.status(500).json({ errorMessage: "The post could not be retrieved." });
      })
  }
});


server.delete('/api/posts/:id', (req, res) => {
  const id = req.params.id;

  posts.get(id)
    .then((post) => {
      let deletedPost = post
      posts
        .remove(id)
        .then(success => {
          if (success) {
            res.json({ deletedPost });
          }
          else {
            res.status(404).json({ errorMessage: "The post with the specified ID does not exist." });
          }
        })
        .catch(error => {
          res.status(500).json({ errorMessage: "The post could not be removed" });
        })
    });

});






server.post('/api/tags', (req, res) => {
  const { tag } = req.body;
  if (!tag) {
    res.status(400).json({ errorMessage: "Please provide a tag for the tag." });
  }
  else {
    tags
      .insert({ tag })
      .then(response => {
        tags.get(response.id)
          .then(tag => {
            res.status(201).json({ tag });
          });
      })
      .catch(error => {
        res.status(500).json({ errorMessage: "There was an error while saving the tag to the database" });
      });
  }
});

server.get('/api/tags', (req, res) => {
  tags.get().then(tag => {
    res.json({ tag });
  })
  .catch(error => {
    res.status(500).json({ errorMessage: "The tags could not be retrieved." });
  });
});

server.get('/api/tags/:id', (req, res) => {
  const id = req.params.id;
  tags
    .get(id)
    .then(tag => {
      if (tag) {
        res.json({ tag });
      }
      else {
        res.status(404).json({ errorMessage: "The tag with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res.status(500).json({ errorMessage: "The tag could not be retrieved." });
    })
});

server.put('/api/tags/:id', (req, res) => {
  const { tag } = req.body;
  const id = req.params.id;
  if (!tag) {
    res.status(400).json({ errorMessage: "Please provide a tag for the tag." });
  }
  else {
    tags
      .update(id, { tag })
      .then(success => {
        if (success) {
          tags.get(id)
            .then(tag => {
              res.json({ tag });
            });
        }
        else {
          res.status(404).json({ errorMessage: "The tag with the specified ID does not exist." });
        }
      })
      .catch(error => {
        res.status(500).json({ errorMessage: "The tag information could not be retrieved." });
      })
  }
});

server.delete('/api/tags/:id', (req, res) => {
  const id = req.params.id;

  tags.get(id)
    .then((tag) => {
      let deletedTag = tag
      tags
        .remove(id)
        .then(success => {
          if (success) {
            res.json({ deletedTag });
          }
          else {
            res.status(404).json({ errorMessage: "The tag with the specified ID does not exist." });
          }
        })
        .catch(error => {
          res.status(500).json({ errorMessage: "The tag could not be removed" });
        })
    });


});

server.get('/api/users/:id/posts', (req, res) => {
  const id = req.params.id;
  users.getUserPosts(id)
    .then(postList => {
      if (postList.length) res.json({ postList });
      else res.status(404).json({ errorMessage: "No posts found." });
    })
    .catch(error => {
      res.status(500).json({ errorMessage: "The posts could not be retrieved." });
    })
});

server.get('/api/posts/:id/tags', (req, res) => {
  const id = req.params.id;
  posts.getPostTags(id)
    .then(tagList => {
      if (tagList.length) res.json({ tagList });
      else res.status(404).json({ errorMessage: "No tags found." });
    })
    .catch(error => {
      res.status(500).json({ errorMessage: "The tags could not be retrieved." });
    })
});





server.listen(port, () => console.log(`Server running on port ${port}`));
