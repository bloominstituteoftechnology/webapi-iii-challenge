const express = require('express');

const users = require('./data/helpers/userDb');
const posts = require('./data/helpers/postDb');

const server = express();
server.use(express.json());

//custom user middleware
function capitalize (req, res, next) {
    req.body.name = req.body.name.toUpperCase();
    next();
}

function checkIfUserExists (req, res, next) {
    const id = req.params.id;
    users.get(id)
    .then(user => {
        if (user) {
            next(); 
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ error: "The user information could not be retrieved." });
    });
}

//custom post middleware
function checkIfPostExists (req, res, next) {
    const id = req.params.id;
    posts.get(id)
    .then(post => {
        if (post) {
            next()
        }
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ error: "The post with the specified ID does not exist." });
    });
}

// function checkUserId (id) {
//     users.get(id)
//     .then(user => {
//         if (typeof user === "object") {
//             return true;
//         }   return false;
//     })
// }



// USER ROUTES .....................................................................
server.get('/users', (req, res) => {
    users.get()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ error: "The users information could not be retrieved." });
    });
})

server.get('/users/:id', (req, res) => {
    const id = req.params.id;
    users.get(id)
    .then(user => {
        if (user.length === 0) {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        } else {res.status(200).json(user)}  
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ error: "The user information could not be retrieved." });
    });
})

server.get('/users/:id/user-posts', checkIfUserExists, (req, res) => {
    const id = req.params.id;
    users.getUserPosts(id)
    .then(posts => {
        if (posts.length === 0) {
            res.status(404).json({ message: "This user does not have any posts." })
        } else {res.status(200).json(posts)}  
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ error: "The user posts could not be retrieved." });
    });
})

server.post('/users', capitalize, (req, res) => {
    const userData = req.body;
    users.insert(userData)
    .then(user => {
        if (!userData.name) {
            res.status(400).json({ error: "Please provide a name for this user." });
        } else if (Number(userData.name.length) > 128) {
            res.status(400).json({ error: "Please provide a username that is less than 128 characters long." });
        } else {
            res.status(201).json(user);
        }
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ error: "There was an error while saving the user to the database" });
    });
  });

  server.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    users.remove(id)
      .then(count => {
          if (count) {
            res.status(200).json({ message: "The user was successfully deleted." });
          } else {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
          }
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: "The user could not be removed" })
        });
  })

  server.put('/users/:id', capitalize, (req, res) => {
    const id = req.params.id;
    const userData = req.body;
    users.update(id, userData)
      .then(count => {
          if (count === 0) {
            res.status(404).json({ message: "The user with the specified ID does not exist." });
          } else if (!userData.name) {
            res.status(400).json({ errorMessage: "Please provide a name for this user." });
          } else if (Number(userData.name.length) > 128) {
            res.status(400).json({ error: "Please provide a username that is less than 128 characters long." });
          } else {
            res.status(200).json({ message: "The user was updated successfully." });
          }
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: "The user information could not be modified." })
    });
  })

  // POST ROUTES .....................................................................
server.get('/posts', (req, res) => {
    posts.get()
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ error: "The posts information could not be retrieved." });
    });
})

server.get('/posts/:id', (req, res) => {
    const id = req.params.id;
    posts.get(id)
    .then(post => {
        if (post) {
            res.status(200).json(post)
        } else  {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        } 
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ error: "The post information could not be retrieved." });
    });
})

server.get('/posts/:id/post-tags', checkIfPostExists, (req, res) => {
    const id = req.params.id;
    posts.getPostTags(id)
    .then(tags => {
        if (tags.length === 0) {
            res.status(404).json({ message: "This post does not have any tags" })
        } else {res.status(200).json(tags)}  
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ error: "The post tags could not be retrieved." });
    });
})

server.post('/posts', (req, res) => {
    const postData = req.body;
    if (!postData.userId || !postData.text) {
        res.status(400).json({ error: "Please provide a user ID and body for this post." });
    } else 
        posts.insert(postData)
        .then(user => {
        res.status(201).json(user);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: "There was an error while saving the post to the database" });
        });
  });

  server.delete('/posts/:id', (req, res) => {
    const id = req.params.id;
    posts.remove(id)
      .then(count => {
          if (count) {
            res.status(200).json({ message: "The post was successfully deleted." });
          } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
          }
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: "The post could not be removed" })
        });
  })

  server.put('/posts/:id', (req, res) => {
    const id = req.params.id;
    const postData = req.body;
    if (!postData.userId || !postData.text) {
        res.status(400).json({ errorMessage: "Please provide a user ID and body for this post." });
      } else 
        posts.update(id, postData)
        .then(count => {
          if (count === 0) {
            res.status(404).json({ message: "The post with the specified ID does not exist." });
          } else {
            res.status(200).json({ message: "The post was updated successfully." });
          }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: "The post information could not be modified." })
        });
  })

server.listen(7000, () => console.log('API running on port 7000'));