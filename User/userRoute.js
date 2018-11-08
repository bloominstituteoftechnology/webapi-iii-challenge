const express = require('express')
const userDb = require('../data/helpers/userDb');
const router = express.Router();


function allCaps(req, res, next) {
    req.body.name = req.body.name.toUpperCase();
    next();
}

router.get('/user/:id', (req, res) => {
    userDb.get(req.params.id)
        .then(user => {
            if(user) {
                res.status(200).json(user)
            } else {
                res.status(404).json({ message: 'user not found' })
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'The user ID can not be found', error: err })
        })
})

router.get('/user/posts/:id', (req, res) => {
    userDb.getUserPosts(req.params.id)  
        .then(users => {
            if(users.length === 0 ) {
                res.status(404).json({ message: 'can not find users posts' })
                } else {
                res.status(200).json(users)
            }
        })
        .catch(err => {
            res.status(500).json({ message: `the posts from ${req.params.id} can not be found` })
        })    
})

router.post('/user', allCaps, (req, res) => {
    const post = req.body
    if (!req.body.name) {
        res.status(400).json({ message: 'Please provide a name' })
    } else {
   userDb.insert(post)
    .then(user => {
         res.status(201).json(post)
        }
    ) 
    .catch(err => {
        res.status(500).json({ message: 'Error adding user to database' })
    })}
})

router.delete('/user/:id', (req, res) => {
    userDb.remove(req.params.id)
        .then(user => {
            if(user) {
                res.status(200).json({ message: `deleted id:${req.params.id}` })
            } else {
                res.status(404).json({ message: `user with id:${req.params.id} does not exist` })
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Error deleting user from database' })
        })
})

router.put('/user/:id', allCaps, (req, res) => {
    if (!req.body.name) {
        res.status(400).json({ message: 'Please provide a name' })
    } else {
        userDb.update(req.params.id, req.body)
            .then(user => {
                res.status(200).json({ message: 'user has been updated', user })
            })
            .catch(err => {
                res.status(500).json({ message: 'Error updating user in database' })
            })
    }
    
})









module.exports = router;