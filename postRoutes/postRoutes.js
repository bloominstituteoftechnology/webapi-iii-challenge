const express = require('express')
const route = express.Router()
const postDb = require('../data/helpers/postDb.js')




// Endpoint for getting entire array of posts
route.get('/', (req, res) => {
    postDb.get()
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => {
        res.status(500).json({message: `Sorry, something went wrong on our end, please see details below for more information: /n ${err}`})
    })
})

// Endpoint for getting single specified post
route.get('/:id', (req, res) => {
    const {id} = req.params
    postDb.get(id)
    .then(post => {
        // if(!post.text) {
        //     res.status(404).json({Error: 'No post by that ID exists.'})
        // }
        res.status(200).json(post)
    })
    .catch(err => {
        res.status(500).json({message: `Sorry, something went wrong on our end, please see details for more information:  ${err}`})
    })
})

// Endpoint for adding a post
route.post('/', (req, res) => {
    const {userId, text} = req.body
    if (!userId || !text) {
        return res.status(400).json({Error: 'Please provide userId and text to add a new post.'})
    }
    postDb.insert({userId, text})
    .then(post => {
        res.status(200).json(`Successfully added a new post.`)
    })
    .catch(err => {
        res.status(500).json({message: `Sorry, something went wrong on our end, please see details below for more information: /n ${err}`})
    })
})

// Endpoint for deleting a post
route.delete('/:id', (req, res) => {
    const {id} = req.params
    postDb.remove(id)
    .then(count => {
        if (count < 1) {
            return res.status(404).json({Error: 'Post with ID does not exist.'})
        }
        res.status(200).json(`You successfully deleted ${count} post(s)`)
    })
    .catch(err => {
        res.status(500).json({message: `Sorry, something went wrong on our end, please see details below for more information: /n ${err}`})
    })
})

// Endpoint for updating a post
route.put('/:id', (req, res) => {
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
        res.status(500).json({message: `Sorry, something went wrong on our end, please see details below for more information: /n ${err}`})
    })
})

module.exports = route