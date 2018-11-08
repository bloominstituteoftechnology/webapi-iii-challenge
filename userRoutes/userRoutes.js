const express = require('express')
const route = express.Router()
const userDb = require('../data/helpers/userDb.js')
const loudName = require('../customMiddleware/toUpperCaseName.js')


// Get all users
route.get('/', (req, res) => {
    userDb.get()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {res.status(500).json({message: `Sorry, something went wrong on our end, please see details below for more information: /n ${err}`})})
})

// Get user by ID
route.get('/:id', (req, res) => {
const {id} = req.params
userDb.get(id)
.then(user => {
    res.status(200).json(user)
})
.catch(err => {res.status(500).json({message: `Sorry, something went wrong on our end, please see details below for more information: /n ${err}`})})
})

// Get user posts by ID
route.get('/:id/posts', (req, res) => {
    userDb.getUserPosts(req.params.id)
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => {res.status(500).json({message: `Sorry, something went wrong on our end, please see details below for more information: /n ${err}`})})
})

// Add post with toUpperCase middleware
route.post('/', loudName, (req, res) => {
    if (!req.body.loudName) {
        return res.status(404).json({Message: 'Please include a name to create a new user'})
    }
    userDb.insert({name: req.body.loudName})
    .then(user => {
        res.status(200).json({Message: `You successfully added a new user`})
    })
    .catch(err => {
        res.status(500).json({message: `Sorry, something went wrong on our end, please see details below for more information: /n ${err}`})
    })
})

// Delete a single user by ID
route.delete('/:id', (req, res) => {
    const {id} = req.params
    userDb.remove(id)
    .then(count => {
        if(count < 1) {
            return res.status(404).json({Error: 'User with that ID does not exist.'})
        }
        res.status(200).json({Message: 'You successfully deleted the post.'})
    })
    .catch
    (err => {res.status(500).json({message: `Sorry, something went wrong on our end, please see details below for more information: /n ${err}`})})
})
// Edit a single user(Please Note: loudName middleware)
route.put('/:id', loudName, (req, res) => {
    const {id} = req.params
    userDb.update(id, {name: req.body.loudName})
    .then(count => {
        if(count < 1) {
            return res.status(404).json({Error: 'User with that ID does not exist.'})
        }
        res.status(200).json({Message: 'You successfully updated this user.'})
    })
    .catch(err => {
        res.status(500).json({message: `Sorry, something went wrong on our end, please see details below for more information: /n ${err}`})
    })
})


module.exports = route;