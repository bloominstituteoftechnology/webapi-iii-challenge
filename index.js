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

server.put('/api/posts/:id', (req, res) => {
    const {id} = req.params
    const {title, contents} = req.body
  
    if (!title || !contents) {
      res.status(400).json({error: "Please provide title and contents for the post."});
    return; 
    }
  
    db
        .update(id, {title, contents})
        .then(count => {
            if ( count > 0 ) {
                db
                    .findById(id)
                    .then(posts => {
                        res.status(200).json(posts[0])
                    })
            } else {
               res.status(404).json({message: "The post with the specified ID does not exist."}) 
            }
        })
        .catch(err => {
            res.status(500).json({message: "The post could not be modified."})
        })
  
  })

server.listen(port, () => console.log(`Server is listening to port ${port}`));