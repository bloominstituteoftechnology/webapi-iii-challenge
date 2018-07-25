const express = require('express');

const users = require('./data/helpers/userDb');
const posts = require('./data/helpers/postDb');
const tags = require('./data/helpers/tagDb');

const server = express();
server.use(express.json());

const port = 4000;

// GET users, posts, tags

server.get('/api/users', (req, res) => {
    users
        .get()
        .then(users => {
            res.json(users);
        })
        .catch(error => {
            res.status(500).json({error: "The users information could not be retrieved."})
        })
})

server.get('/api/users/posts', (req, res) => {
    posts
        .get()
        .then(posts => {
            res.json(posts);
        })
        .catch(error => {
            res.status(500).json({error: "The posts information could not be retrieved."})
        })
})

server.get('/api/tags', (req, res) => {
    tags
        .get()
        .then(tags => {
            res.json(tags);
        })
        .catch(error => {
            res.status(500).json({error: "The tags information could not be retrieved."})
        })
})

// GET users, posts, tags by ID

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    
    users
        .get(id)
        .then(users => {
            if (users.length === 0) {
                res.status(404).json({ message: "This user with this specified ID does not exist." });
            } else {
                res.status(200).json(users);
            }
        })
        .catch (message => {
            res.status(500).json({ message: "This user information could not be retrieved." })
        })
  })

server.get('/api/users/posts/:id', (req, res) => {
    const id = req.params.id;
    
    users
        .getUserPosts(id)
        .then(posts => {
            if (posts.length === 0) {
                res.status(404).json({ message: "This user's posts do not exist." });
            } else {
                res.status(200).json(posts);
            }
        })
        .catch (message => {
            res.status(500).json({ message: "The post information could not be retrieved." })
        })
  })

  server.get('/api/tags/:id', (req, res) => {
    const id = req.params.id;
    
    tags
        .get(id)
        .then(tags => {
            if (tags.length === 0) {
                res.status(404).json({ message: "This tag with this specified ID does not exist." });
            } else {
                res.status(200).json(tags);
            }
        })
        .catch (message => {
            res.status(500).json({ message: "This tag information could not be retrieved." })
        })
  })

  // POST users, posts, tags

  server.post('/api/users', (req, res) => {

    const {name} = req.body;
    if (!name) {
      res.status(400).json({error: "Please provide a name for the user."});
    return; 
    }
  
    users
        .insert({name})
        .then(users => {
              res.status(201).json(users);
        })
        .catch(errorMessage => {
            res.status(500).json({error: "There was an error while saving the user to the database"})
        })
  })

  server.post('/api/posts', (req, res) => {

    const {text, userId} = req.body;
    if (!text || !userId) {
      res.status(400).json({error: "Please provide text and a userId for the post."});
    return; 
    }
  
    posts
        .insert({text, userId})
        .then(posts => {
              res.status(201).json(posts);
        })
        .catch(errorMessage => {
            res.status(500).json({error: "There was an error while saving the post to the database"})
        })
  })

  server.post('/api/tags', (req, res) => {

    const {tag} = req.body;
    if (!tag) {
      res.status(400).json({error: "Please provide a tag before submitting."});
    return; 
    }
  
    tags
        .insert({tag})
        .then(tags => {
              res.status(201).json(tags);
        })
        .catch(errorMessage => {
            res.status(500).json({error: "There was an error while saving the tag to the database"})
        })
  })

  // Delete user, post, tag by id

  server.delete('/api/users/:id', (req, res) => {
    const {id} = req.params
    
    users
        .remove(id)
        .then(response => {
            res.status(204).json(response);
        })
        .catch(err => {
            res.status(500).json({message: "The user with the specified ID does not exist."})
        })
})

server.delete('/api/users/posts/:id', (req, res) => {
    const {id} = req.params
    
    posts
        .remove(id)
        .then(response => {
            res.status(204).json(response);
        })
        .catch(err => {
            res.status(500).json({message: "The user post with the specified ID does not exist."})
        })
})

server.delete('/api/tags/:id', (req, res) => {
    const {id} = req.params
    
    tags
        .remove(id)
        .then(response => {
            res.status(204).json(response);
        })
        .catch(err => {
            res.status(500).json({message: "The tag with the specified ID does not exist."})
        })
})

// PUT users, posts, tags

{/*server.put('/api/users/:id', (req, res) => {
    const {id} = req.params;
    const {name} = req.body;
    
    if (!name) {
        res.status(400).json({error: "Please provide a name for the user."});
      return; 
      }

    users
        .update(id, {name})
        .then(response => {
            if ( response > 0 ) {
                users
                    .get(id)
                    .then(users => {
                        res.status(200).json({users})
                    })
            } else {
               res.status(404).json({message: "user not found"}) 
            }
        })
        .catch(err => {
            res.status(500).json({message: "The user with the specified ID does not exist."})
        })

})*/}

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) {
        sendUserError(400, `User must have a name`, res);
        return;
    }
    users
        .update(id, {name})
        .then(user => {
            if(user.length === 0) {
                sendUserError(404, `The user with the ID ${id} does not exist.`, res);
                return;
            }
            users
                .get(id)
                .then(user => {
                    res.json({user});
                })
                .catch(error => {
                    sendUserError(500, `There was an error processing your request`, res);
                    return;
                })
        })
        .catch(error => {
            sendUserError(500, `There was an error processing your request`, res);
            return;
        });
});

server.put('/api/posts/:id', (req, res) => {
    const {id} = req.params
    const { userId, text } = req.body
  
    if (!userId || !text) {
      res.status(400).json({error: "Please provide userId and text for the post."});
    return; 
    }
  
    posts
        .update(id, {userId, text})
        .then(response => {
            if ( response > 0 ) {
                posts
                    .get(id)
                    .then(posts => {
                        res.status(200).json({posts})
                    })
            } else {
               res.status(404).json({message: "The post with the specified ID does not exist."}) 
            }
        })
        .catch(err => {
            res.status(500).json({message: "The post could not be modified."})
        })
  
  })

  server.put('/api/tags/:id', (req, res) => {
    const {id} = req.params
    const { tag } = req.body
  
    if (!tag ) {
      res.status(400).json({error: "Please provide the tag."});
    return; 
    }
  
    tags
        .update(id, {tag})
        .then(response => {
            if ( response > 0 ) {
                tags
                    .get(id)
                    .then(tags => {
                        res.status(200).json({tags})
                    })
            } else {
               res.status(404).json({message: "The tag with the specified ID does not exist."}) 
            }
        })
        .catch(err => {
            res.status(500).json({message: "The tag could not be modified."})
        })
  
  })

server.listen(port, () => console.log(`Server is listening to port ${port}`));