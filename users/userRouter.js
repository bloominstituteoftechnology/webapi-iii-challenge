const express = require('express');
const db = require('./userDb')
const postDB = require('../posts/postDb')

const router = express.Router();

router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

router.post('/', validateUser, (req, res) => {
    const info = req.body

    const { name } = info
    if(!name) res.status(400).json({ errorMessage: "Please provide a name for the user." })

    db.insert(info)
    .then(db => {
        res.status(201).json(info)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            error: "There was an error while saving the user to the database"
        })
    })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
    const id = req.params.id 
    const info = req.body
    const { text } = req.body
    const userInfo = {user_id: id, ...info}
    
    if(!text) res.status(400).json({ errorMessage: "Please provide text for the post." })

    postDB.insert(userInfo)
    .then(newPost => {
        res.status(201).json(userInfo)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            error: "There was an error while saving the post to the database"
        })
      })
});

router.get('/', (req, res) => {
    db.get(req.query)
    .then(db => {
        res.status(200).json(db)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            error: "Error when retrieving users information."
        })
    })
});

router.get('/:id', validateUserId, (req, res) => {
    db.getById(req.params.id)
    .then(db => {
        if(db){
            res.status(200).json(db)
        } else {
            res.status(404).json({ message: 'User not found' })
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            error: "Error when retrieving users information."
        })
    })
});

router.get('/:id/posts', validateUserId, (req, res) => {
    db.getUserPosts(req.params.id)
    .then(db => {
        if(db.length === 0) {
            res.status(404).json({ message: 'User\'s posts not found' })
        } else {
            res.status(200).json(db)
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            error: "Error when retrieving user\'s posts."
        })
    })
});

router.delete('/:id', validateUserId, (req, res) => {
    const id = req.params.id

    db.remove(id)
    .then(count => {
        console.log(count, id)
        if(count === 0){
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        } else {
            res.status(200).json({ message: `User with id ${id} was deleted`})
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            error: "The user could not be removed"
        })
      })
});

router.put('/:id', validateUserId, (req, res) => {
    const id = req.params.id
    const info = req.body
    const { name } = info

    if(!name) res.status(400).json({ errorMessage: "Please provide a name for the user." })

    db.update(id, info)
    .then(count => {
        console.log(count)
        if(count === 0){
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        } else {
            res.status(200).json(info)
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            error: "The user information could not be modified."
        })
      })
});

//custom middleware

function validateUserId(req, res, next) {
    db.getById(req.params.id)
    .then(data => {
        if(!data){
            res.status(400).json({ message: "invalid user id" })
        } else {
            req.user = data
            console.log(req.user)
        }
    })
    .catch(err => console.log(err))
    next()
};

function validateUser(req, res, next) {
    const { name } = req.body

    if(Object.entries(req.body).length === 0){
        res.status(400).json({ message: "missing user data" })
    }
    if(!name) res.status(400).json({ message: "missing required name field" })

    next()
};

function validatePost(req, res, next) {
    const { text } = req.body
    
    if(Object.entries(req.body).length === 0){
        res.status(400).json({ message: "missing post data" })
    }
    if(!text) res.status(400).json({ message: "missing required text field" })
    next()
};

module.exports = router;
