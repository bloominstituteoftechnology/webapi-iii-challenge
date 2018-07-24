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

server.listen(port, () => console.log(`Server is listening to port ${port}`));