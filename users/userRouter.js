const express = 'express';
const db = require('./userDb')
const postDb = require('../posts/postDb');
const router = require('express').Router();

router.post('/', validateUser, (req, res) => {
    db.insert(req.body)
    .then(user => {
        res.status(201).json(user);
    })
    .catch(err => {
        res.status(500).json({error: 'error add new user'})
    })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
    if(req.body){
        postDb.insert(req.body)
            .then(post => {
                res.status(201).json(post);
            })
            .catch(err => {
                res.status(500).json({error: 'There was an error posting to the database.'})
            })
    } else 
        res.status(400).json({error: 'Missing required body'})
});

router.get('/', (req, res) => {
    db.get()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({error: 'Server error, did not get all users'})
        })
});

router.get('/:id', validateUserId, (req, res) => {
    const id = req.params.id;
    db.getById(id)
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({error: 'Server error, did not get all users'})
        })
});

router.get('/:id/posts', validateUserId,  (req, res) => {
    const id = req.params.id;
    db.getUserPosts(id)
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        res.status(500).json({error: 'Server error, did not get all users'})
    })
});

router.delete('/:id', validateUserId, (req, res) => {
    const id = req.params.id;
    db.remove(id)
        .then(user => {
            res.status(204).json(user);
        })
        .catch(err => {
            res.status(500).json({error: 'Server error, did not get all users'})
        })
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    db.update(id, changes)
        .then(user => {
            res.status(204).json({message: `user ${id} succesfully updated`})
        })
        .catch(err => {
            req.status(500).json({error: 'server error, did not update post'})
        })
});

function validateUserId(req, res, next) {
    const id = req.params.id;
    db.getById(id)
        .then(user => {
            if (user) {
                req.user = user;
                next();
            }
            else {
                res.status(400).json({message: 'invalid user id'});
            }
        })
        .catch (err => {
            res.status(500).json({error: 'There was an error accessing that user from the database.'})
        })
}

function validateUser(req, res, next) {
    if(!req.body){
        res.status(400).json({message: 'missing user data'})
    }
    else if (!req.body.name) {
        res.status(400).json({message: 'missing required name field'})

    }
    next();
};

function validatePost(req, res, next) {
    if (!req.body) {
        res.status(400).json({message: 'missing post data'})
    }
    else if (!req.body.text) {
        res.status(400).json({message: 'missing required text field'})
    }
    next();
};

module.exports = router;