const express = require('express')
const server = express()
// const helmet = require('helmet')
// const morgan = require('morgan')

const postDb = require('../data/helpers/postDb')
const tagDb = require('../data/helpers/tagDb')
const userDb = require('../data/helpers/userDb')




server.use(express.json())
// server.use(helmet())
// server.use(morgan('short'))
module.exports = server


// ================== middleware ==================

function uppercased(req, res, next) {
    if (req.body.name) {
        req.body.name = req.body.name.toUpperCase()
    }
    next()
}

// ================== server ==================
server.get('/', (req, res) => {
    res.send({ message: 'hellooooooooooo' })
})



// ==================================== USER ENDPOINTS ====================================
// ================== get users ==================
server.get('/api/users', (req, res) => {
    userDb.get()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(error => {
            res.status(500).json({ message: 'The user information could not be retrieved.', error: error })
        })
})

// ================== get specific user ==================
server.get('/api/users/:id', (req, res) => {
    const { id } = req.params
    userDb.get(id)
        .then(user => {
            if (user) {
                res.status(200).json(user)
            } else {
                res.status(404).json({ message: "The user with the specified ID does not exist." })
            }
        })
        .catch(error => {
            res.status(500).json({ message: "The user information could not be retrieved.", error: error })
        })
})

// ================== add new user ==================
server.post('/api/users', uppercased, (req, res) => {
    const { name } = req.body
    if (!name) {
        res.status(400).json({ message: "Provide a name for the new user." })
    } else {
        userDb.insert(req.body)
            .then(user => {
                userDb.get(user.id)
                    .then(user => {
                        res.status(201).json(user)
                    })
                    .catch(error => {
                        res.status(404).json({ message: "The user with the specified ID does not exist." })
                    })
            })
            .catch(error => {
                res.status(500).json({ message: "There was an error while saving the user to the database", error: error })
            })
    }
})

// ================== update user ==================
server.put('/api/users/:id', uppercased, (req, res) => {
    const { name } = req.body
    const { id } = req.params.id
    if (!name) {
        res.status(400).json({ message: "Provide a name for the new user." })
    } else {
        userDb
            .update(req.params.id, req.body)
            .then(user => {
                if (user) {
                    userDb.get(req.params.id)
                        .then(user => {
                            res.status(200).json(user)
                        })
                        .catch(error => {
                            res.status(404).json({ message: "The user with the specified ID does not exist." })
                        })
                } else {
                    res.status(404).json({ message: "The user with the specified ID does not exist." })
                }
            })
            .catch(error => {
                res.status(500).json({ message: "The user information could not be modified.", error: error })
            })
    }
})

// ================== delete user ==================
server.delete('/api/users/:id', (req, res) => {
    userDb.remove(req.params.id)
        .then(user => {
            if (user) {
                res.status(200).json(user)
            } else (
                res.status(404).json({ message: "The user with the specified ID does not exist." })
            )
        })
        .catch(error => {
            res.status(500).json({ message: "The post could not be removed.", error: error })
        })
})



// ==================================== POST ENDPOINTS ====================================
// ================== get posts ==================
server.get('/api/posts', (req, res) => {
    postDb.get()
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(error => {
            res.status(500).json({ message: 'The post information could not be retrieved.', error: error })
        })
})

// ================== get specific post ==================
server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params
    postDb.get(id)
        .then(post => {
            if (post) {
                res.status(200).json(post)
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(error => {
            res.status(500).json({ message: "The post information could not be retrieved.", error: error })
        })
})

// ================== add new post ==================
server.post('/api/posts', uppercased, (req, res) => {
    const { text, userId } = req.body
    if (!text || !userId) {
        res.status(400).json({ message: "Provide text and a user ID for the new post." })
    } else {
        postDb.insert(req.body)
            .then(post => {
                postDb.get(post.id)
                    .then(post => {
                        res.status(201).json(post)
                    })
                    .catch(error => {
                        res.status(404).json({ message: "The post with the specified ID does not exist.", error: error })
                    })
            })
            .catch(error => {
                res.status(500).json({ message: "There was an error while saving the post to the database", error: error })
            })
    }
})

// ================== update post ==================
server.put('/api/posts/:id', uppercased, (req, res) => {
    const { text, userId } = req.body
    const { id } = req.params.id
    if (!text || !userId) {
        res.status(400).json({ message: "Provide a name and user ID for the new post." })
    } else {
        postDb
            .update(req.params.id, req.body)
            .then(post => {
                if (post) {
                    postDb.get(req.params.id)
                        .then(post => {
                            res.status(200).json(post)
                        })
                        .catch(error => {
                            res.status(404).json({ message: "The post with the specified ID does not exist.", error: error })
                        })
                } else {
                    res.status(404).json({ message: "The post with the specified ID does not exist." })
                }
            })
            .catch(error => {
                res.status(500).json({ message: "The post information could not be modified.", error: error })
            })
    }
})

// ================== delete post ==================
server.delete('/api/posts/:id', (req, res) => {
    postDb.remove(req.params.id)
        .then(post => {
            if (post) {
                res.status(200).json(post)
            } else (
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            )
        })
        .catch(error => {
            res.status(500).json({ message: "The post could not be removed.", error: error })
        })
})