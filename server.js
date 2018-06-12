
const posts = require('./data/helpers/postDb.js')
const users = require('./data/helpers/userDb.js')
const tags = require('./data/helpers/tagDb.js')

var cors = require('cors');

const express = require('express');
const server = express();
server.use(express.json());
server.use(cors());

const sendUserError = (status, message, res) => {
    res.status(status).json({ errorMessage: message });
    return;
};

//get all users or single user with id query:
server.get('/api/users', (req, res) => {
    if (!req.query) {
        users
            .get()
            .then(users => {
                res.json(users);
            })
            .catch(error => {
                sendUserError(500, 'The users information could not be retrieved.', res);
                return;
            });
    } else {
        const { id } = req.query;
        users
            .get(id)
            .then(user => {
                res.json(user);
            })
            .catch(error => {
                sendUserError(500, "The users information could not be retrieved.", res);
                return;
            });
    }
});

//list of posts for user:
server.get('/api/users/posts', (req, res) => {
    const { id } = req.query;
    users
        .getUserPosts(id)
        .then(posts => {
            res.json(posts);
        })
        .catch(error => {
            sendUserError(500, "The users information could not be retrieved.", res);
            return;
        });
});

//add user:
server.post('/api/users', (req, res) => {
    const { name } = req.body;
    if (!name) {
        sendUserError(400, "Please provide name of the user.", res);
        return;
    }
    users
        .insert({ name })
        .then(user => {
            res.json(user);
        })
        .catch( error => {
            sendUserError(500, "The user could not be created.", res);
        });
});

//edit user name:
server.put('/api/users/:id', (req, res) => {
    const { name } = req.body;
    const id = req.params.id;
    users
        .update(id, { name })
        .then(user => {
            if (user.length === 0) {
                sendUserError(404, 'The post with the specified ID does not exist.', res);
                return;
            }
            res.json(user);
        })
        .catch(error => {
            sendUserError(500, "The user could not be updated.", res);
        });
});

//delete user:
server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    users
        .remove(id)
        .then(user => {
            if (user.length === 0) {
                sendUserError(404, 'The post with the specified ID does not exist.', res);
                return;
            }
            res.json(user);
        })
        .catch(error => {
            sendUserError(500, "The user could not be updated.", res);
        });
});

//get posts or post (using query):
server.get('/api/posts', (req, res) => {
    const { id } = req.query;
    posts
        .get(id)
        .then(user => {
            res.json(user);
        })
        .catch(error => {
            sendUserError(500, "The users posts could not be retrieved.", res);
            return;
        });
});

//list of tags for post:
server.get('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    posts
        .getPostTags(id)
        .then(tags => {
            if (tags.length === 0) {
                sendUserError(404, 'The post with the specified ID does not exist.', res);
                return;
            }
            res.json(tags);
        })
        .catch(error => {
            sendUserError(500, "The users posts could not be retrieved.", res);
        });
});

//add new post:
server.post('/api/posts', (req, res) => {
    const { text, userId } = req.body;
    if (!text || !userId) {
        sendUserError(400, "Please provide text.", res);
        return;
    }
    posts
        .insert({ text, userId })
        .then(post => {
            res.json(post);
        })
        .catch(error => {
            sendUserError(500, "The post could not be created.", res);
            return;
        });
});

//edit post:
server.put('/api/posts/:id', (req, res) => {
    const { text } = req.body;
    const id = req.params.id;
    posts
        .update(id, { text })
        .then(post => {
            if (post.length === 0) {
                sendUserError(404, 'The post with the specified ID does not exist.', res);
                return;
            }
            res.json(post);
        })
        .catch(error => {
            sendUserError(500, "The post could not be updated.", res);
        });
});

//delete post:
server.delete('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    posts
        .remove(id)
        .then(post => {
            if (post.length === 0) {
                sendUserError(404, 'The post with the specified ID does not exist.', res);
                return;
            }
            res.json(post);
        })
        .catch(error => {
            sendUserError(500, "The post could not be removed.", res);
        });
});

//get all tags or tag by id using query
server.get('/api/tags', (req, res) => {
    const { id } = req.query;
    tags
        .get(id)
        .then(posts => {
            res.json(posts);
        })
        .catch(error => {
            sendUserError(500, "The requested tags could not be retrieved.", res);
            return;
        });
});

//add tag
server.post('/api/tags', (req, res) => {
    const { tag } = req.body;
    if (!tag) {
        sendUserError(400, "Please provide tag.", res);
        return;
    }
    tags
        .insert({ tag })
        .then(result => {
            res.json(result);
        })
        .catch(error => {
            sendUserError(500, "The tag could not be created.", res);
            return;
        });
});

//update tag:
server.put('/api/tags/:id', (req, res) => {
    const { tag } = req.body;
    const id = req.params.id;
    tags
        .update(id, { tag })
        .then(result => {
            if (result.length === 0) {
                sendUserError(404, 'The tag with the specified ID does not exist.', res);
                return;
            }
            res.json(result);
        })
        .catch(error => {
            sendUserError(500, "The tag could not be updated.", res);
        });
});

//delete tag:
server.delete('/api/tags/:id', (req, res) => {
    const id = req.params.id;
    tags
        .remove(id)
        .then(result => {
            if (result.length === 0) {
                sendUserError(404, 'The tag with the specified ID does not exist.', res);
                return;
            }
            res.json(result);
        })
        .catch(error => {
            sendUserError(500, "The tag could not be removed.", res);
        });
});

/*server.get('/api/users', (req,res) =>{
    const { id } = req.query;
    users
        .get(id)
        .then(user => {
            res.json(user);
        })
        .catch( error => {
            sendUserError(500, "The users information could not be retrieved.", res);
            return;
        });
});

/*server.post('/api/posts', (req, res) => {
    const { title, contents } = req.body;
    if (!title || !contents) {
        sendUserError(400, "Please provide title and contents for the post.", res);
        return;
    }
    db
        .insert({ title, contents })
        .then(response => {
            res
                .status(201)
                .json({ title, contents });
        })
        .catch(error => {
            sendUserError(400, "There was an error while saving the post to the database.", res);
            return;
        });
});

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db
      .findById(id)
      .then(post => {
        if (post.length === 0) {
          sendUserError(404, 'The post with the specified ID does not exist.', res);
          return;
        }
        res.json(post);
      })
      .catch(error => {
        sendUserError(500, 'The post information could not be retrieved.', res);
      });
});



server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db
      .remove(id)
      .then(response => {
        if (response === 0) {
          sendUserError(404, "The post with the specified ID does not exist.", res);
          return;
        }
        res.json({ success: `Post with id: ${id} removed from system` });
      })
      .catch(error => {
        sendUserError(500, 'The post could not be removed', res);
        return;
      });
});

server.put('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    const { title, contents } = req.body;
    if (!title || !contents) {
      sendUserError(400, 'Please provide title and contents for the post.', res);
      return;
    }
    db
      .update(id, { title, contents })
      .then(response => {
        if (response == 0) {
          sendUserError(
            404,
            'The post with the specified ID does not exist.',
            res
          );
          return;
        }
        db
          .findById(id)
          .then(post => {
            if (post.length === 0) {
              sendUserError(500, 'The post information could not be modified.', res);
              return;
            }
            res
                .status(200)
                .json({ title, contents });
          })
          .catch(error => {
            sendUserError(500, 'Error looking up post', res);
          });
      })
      .catch(error => {
        sendUserError(500, 'Something bad happened in the database', res);
        return;
      });
});*/
  

server.listen(5000, () => console.log('server running on 5000'));