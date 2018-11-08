//Imports
const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const userDb = require('./data/helpers/userDb.js')
const postDb = require('./data/helpers/postDb.js')

const server = express()

//Middleware
server.use(express.json())
server.use(helmet())
server.use(morgan('dev'))
server.use(cors())


const loudName = (req, res, next) => {
    req.body.loudName = req.body.name.toUpperCase()
    next();
}


// User End point


// Get all users
server.get('/users', (req, res) => {
    userDb.get()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {res.status(500).json({message: 'Sorry, something went wrong on our end, please try again.'})})
})

// Get user by ID
server.get('/users/:id', (req, res) => {
const {id} = req.params
userDb.get(id)
.then(user => {
    res.status(200).json(user)
})
.catch(err => {res.status(500).json({message: 'Sorry, something went wrong on our end, please try again.'})})
})

// Get user posts by ID
server.get('/users/:id/posts', (req, res) => {
    userDb.getUserPosts(req.params.id)
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => {res.status(500).json({message: 'Sorry, something went wrong on our end, please try again.'})})
})

// Add post with toUpperCase middleware
server.post('/users', loudName, (req, res) => {
    if (!req.body.loudName) {
        return res.status(404).json({Message: 'Please include a name to create a new user'})
    }
    userDb.insert({name: req.body.loudName})
    .then(user => {
        res.status(200).json({Message: `You successfully added a new user`})
    })
    .catch(err => {
        res.status(500).json({message: 'Sorry, something went wrong on our end, please try again.'})
    })
})

// Delete a single user by ID
server.delete('/users/:id', (req, res) => {
    const {id} = req.params
    userDb.remove(id)
    .then(count => {
        if(count < 1) {
            return res.status(404).json({Error: 'User with that ID does not exist.'})
        }
        res.status(200).json({Message: 'You successfully deleted the post.'})
    })
    .catch
    (error => {res.status(500).json({message: 'Sorry, something went wrong on our end, please try again.'})})
})

server.put('/users/:id', loudName, (req, res) => {
    const {id} = req.params
    userDb.update(id, {name: req.body.loudName})
    .then(count => {
        if(count < 1) {
            return res.status(404).json({Error: 'User with that ID does not exist.'})
        }
        res.status(200).json({Message: 'You successfully updated this user.'})
    })
    .catch(err => {
        res.status(500).json({message: 'Sorry, something went wrong on our end, please try again.'})
    })
})





//////////////////////////////////////


// Post End point

// Endpoint for getting entire array of posts
server.get('/posts', (req, res) => {
    postDb.get()
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => {
        res.status(500).json({message: 'Sorry, something went wrong on our end, please try again.'})
    })
})

// Endpoint for getting single specified post
server.get('/posts/:id', (req, res) => {
    const {id} = req.params
    postDb.get(id)
    .then(post => {
        // if(!post.text) {
        //     res.status(404).json({Error: 'No post by that ID exists.'})
        // }
        res.status(200).json(post)
    })
    .catch(err => {
        res.status(500).json({message: 'Sorry, something went wrong on our end, please try again.'})
    })
})
// Endpoint for adding a post
server.post('/posts', (req, res) => {
    const {userId, text} = req.body
    if (!userId || !text) {
        return res.status(400).json({Error: 'Please provide userId and text to add a new post.'})
    }
    postDb.insert({userId, text})
    .then(post => {
        res.status(200).json(`Successfully added a new post.`)
    })
})
// Endpoint for deleting a post
server.delete('/posts/:id', (req, res) => {
    const {id} = req.params
    postDb.remove(id)
    .then(count => {
        if (count < 1) {
            return res.status(404).json({Error: 'Post with ID does not exist.'})
        }
        res.status(200).json(`You successfully deleted ${count} post(s)`)
    })
    .catch(err => {
        res.status(500).json({message: 'Sorry, something went wrong on our end, please try again.'})
    })
})
// Endpoint for Updating a post
server.put('/posts/:id', (req, res) => {
    const {id} = req.params
    const {userId, text} = req.body
    if (!userId || !text) {
        return res.status(400).json({Error: 'Please provide userId and text to update this post.'})
    }
    postDb.update(id, {userId, text})
    .then(count => {
        if (count < 1) {
            return res.status(404).json({Error: 'Post with ID does not exist.'})
        }
        res.status(200).json(`You successfully updated ${count} post(s)`)
    })
    .catch(err => {
        res.status(500).json({message: 'Sorry, something went wrong on our end, please try again.'})
    })
})


module.exports = server;

