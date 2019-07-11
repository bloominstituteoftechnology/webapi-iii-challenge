const express = require('express');

const router = express.Router();

const User = require('./userDb.js');
const Post = require('../posts/postDb.js');

//Post a new user
router.post('/', validateUser, async, (req, res) => {
    const { userName } = req.body;
    
    try {
        const newUser = await User.insert({ userName });
        res.status(201).json(newUser)
    }
    catch { 
        res.status(500).json({ errorMessage: 'There was an error while add the new user!' })
    }
});

//Post a comment on a specific user
router.post('/:id/posts', validateUser, validatePost, async (req, res) => {
    const id = req.user.id;
    const text = req.body.text;

    try {
        const newPost = await Post.insert({ text, id })
        res.status(201).json(newPost)
    }
    catch (error) {
        res.status(500).json({ errorMessage: 'There was an error while saving the post to the database.' })
    }
});

router.get('/', (req, res) => {

});

router.get('/:id', (req, res) => {

});

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {
    const id = req.params.id;

    User.getById(id)
        .then(user => {
            if(user) {
                req.user = user;
                next();
            } else {
                res.status(400).json({ message: 'invalid user id' })
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'user could not be retieved' })
        })
};

function validateUser(req, res, next) {
    if (!req.body) {
        res.status(400).json({ message: 'missing user data' })
    } else if (!req.body.text) {
        res.status(400).json({ message: 'missing required name field' })
    } else {
        next()
    }
};

function validatePost(req,res, next) {
    if(!req.body) {
        res.status(404).json({ errorMessage: 'missing post data' })
    } else if (!req.body.text) {
        res.status(400).json({ errorMessage: 'missing required text field' })
    } else {
        next()
    }
}

module.exports = router;