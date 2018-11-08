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


// middleware

function uppercased(req, res, next) {
    if (req.body.name) {
        req.body.name = req.body.name.toUpperCase()
    }
    next()
}


// ================== server ==================
server.get('/', (req, res) => {
    res.send({ message: 'api running' })
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
    const { id } = req.params.id
    userDb.get(id)
        .then(user => {
            if (user) {
                res.status(200).json(user)
            } else {
                res.status(404).json({ message: 'The user with the specified ID does not exist.' })
            }
        })
        .catch(error => {
            res.status(500).json({ message: 'The user information could not be retrieved.', error: error })
        })
})

// ================== add new user ==================
server.post('/api/users/:id', uppercased, (req, res) => {
    const { newUser } = req.body
    if (!newUser) {
        res.status(400).json({ message: "Provide a name for the new user." })
    } else {
        userDb.insert(newUser)
            .then(user => {
                res.status(201).json(user)
            })
            .catch(error => {
                res.status(500).json({ message: "There was an error while saving the user to the database", error: error })
            })
        
    }
})

// ================== update user ==================
server.put('/api/users/:id', uppercased, (req, res) => {
    const { newUser } = req.body
    const { id } = req.params.id
    if (!newUser) {
        res.status(400).json({ message: "Provide a name for the new user." })
    } else {
        userDb
            .update(id, newUser)
            .then(user => {
                if (user) {
                    res.status(200).json(user)
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
    const { id } = req.params.id
    userDb.remove(id)
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
    const { id } = req.params.id
    postDb.get(id)
        .then(post => {
            if (post) {
                res.status(200).json(post)
            } else {
                res.status(404).json({ message: 'The post with the specified ID does not exist.' })
            }
        })
        .catch(error => {
            res.status(500).json({ message: 'The post information could not be retrieved.', error: error })
        })
})

// ================== add new post ==================
server.post('/api/posts/:id', uppercased, (req, res) => {
    const { newpost } = req.body
    if (!newpost) {
        res.status(400).json({ message: "Provide a name for the new post." })
    } else {
        postDb.insert(newpost)
            .then(post => {
                res.status(201).json(post)
            })
            .catch(error => {
                res.status(500).json({ message: "There was an error while saving the post to the database", error: error })
            })
        
    }
})

// ================== update post ==================
server.put('/api/posts/:id', uppercased, (req, res) => {
    const { newpost } = req.body
    const { id } = req.params.id
    if (!newpost) {
        res.status(400).json({ message: "Provide a name for the new post." })
    } else {
        postDb
            .update(id, newpost)
            .then(post => {
                if (post) {
                    res.status(200).json(post)
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
    const { id } = req.params.id
    postDb.remove(id)
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





module.exports = server