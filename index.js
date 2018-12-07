const express = require('express');
const userDb = require('./data/helpers/userDb.js');
const postDb = require('./data/helpers/postDb.js');
const cors = require('cors');

const server = express();
const PORT = 9000;

// Muiddleware

server.use(cors());
server.use(express.json());
server.use((req, res, next) => {
    const name = req.body.name;
    if (name) {
        req.body.name = name.toUpperCase();
        next();
    } else {
        next();
    }
})

// Endpoints

server.get('/users', (req, res) => {
    userDb.get()
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to load users' })
        })
})

server.get('/users/:id', (req, res) => {

    const { id } = req.params;

    userDb.get(id)
        .then(user => {
            console.log(user)
            if (user) {
                res.json(user)
            } else {
                res.status(404).json({ message: 'The user with specified ID does not exist' })
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to load user' })
        })
})

server.get('/users/:id/posts', (req, res) => {

    const { id } = req.params;

    userDb.getUserPosts(id)
        .then(userPosts => {
            if (userPosts) {
                res.json(userPosts)
            } else {
                res.status(404).json({ message: 'User with specified ID does not exist'})
            }
        })
        .catch(err => {
        res.status(500).json({ message: 'Failed to load users posts'})
    })
})

server.post('/users', (req, res) => {

    const user = req.body;

    if (user.name) {
        userDb.insert(user)
            .then(idInfo => {
                userDb.get(idInfo.id).then(user => {
                    res.status(201).json(user)
                })
            })
            .catch(err => {
                res.status(500).json({ message: 'Failed to insert user' })
            })
    } else {
        res.status(400).json({
            message: 'missing name'
        })
    }
})

server.delete('/users/:id', (req, res) => {

    const { id } = req.params;
    const user = req.body;

    userDb.remove(id)
        .then(count => {
            if (count) {
                res.json(user)
            } else {
                res.status(404).json({ message: 'The user with specified ID does not exist' })
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to delete user' })
        })
})

server.put('/users/:id', (req, res) => {

    const { id } = req.params;
    const user = req.body;

    if (user.name) {
        userDb.update(id, user)
            .then(user => {
                if (id) {
                    res.json({ message: 'User has been updated' })
                } else {
                    res.status(404).json({ message: 'The user with the specified ID does not exist' })
                }
            })
            .catch(err => {
                res.status(500).json({ message: 'Failed to update user' })
            })
    } else {
        res.status(400).json({ messgae: 'missing name' })
    }
})

server.get('/posts', (req, res) => {
    postDb.get()
        .then(posts => {
            res.json(posts)
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to load posts' })
        })
})

server.get('/posts/:id', (req, res) => {

    const { id } = req.params;

    postDb.get(id)
        .then(post => {
            if (post) {
                res.json(post)
            } else {
                res.status(404).json({ message: 'The post with the specified ID does not exist' })
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to load post' })
        })
})

server.post('/posts', (req, res) => {

    const post = req.body;

    if (post.userId && post.text) {
        postDb.insert(post)
            .then(idInfo => {
                postDb.get(idInfo.id).then(post => {
                    res.status(201).json(post);
                })
            })
            .catch(err => {
                res.status(500).json({ message: 'Failed to insert post' })
            })
    } else {
        res.status(400).json({ message: 'Missing user ID or text' })
    }
})

server.delete('/posts/:id', (req, res) => {

    const { id } = req.params;
    const post = req.body;

    postDb.remove(id)
        .then(count => {
            if (count) {
                res.json(post)
            } else {
                res.status(404).json({ message: 'Post with specified ID does not exist'})
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to delete post' })
        })
})

server.put('/posts/:id', (req, res) => {
    const { id } = req.params;
    const post = req.body;

    if (post.userId && post.text) {
        postDb.update(id, post)
            .then(post => {
                if (id) {
                    res.json({ message: 'Post has been updated'})
                } else {
                    res.status(404).json({ message: 'Post with specified ID does not exist'})
                }
            })
            .catch(err => {
            res.status(500).json({ message: 'Failed to update post'})
        })
    } else {
        res.status(400).json({ message: 'Missing user ID or text'})
    }
})

// Listen

server.listen(PORT, () => {
    console.log(`Server is alive and well at port ${PORT}`)
});