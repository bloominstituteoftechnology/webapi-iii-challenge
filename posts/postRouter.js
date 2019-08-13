const express = 'express';
const db = require('./postDb');

const router = require('express').Router();

router.get('/', (req, res) => {
    db.get()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            res.status(500).json({error: 'error retrieving posts'})
        });
});

router.get('/:pid', validatePostId, (req, res) => {
    const id = req.params.pid;
    db.getById(id)
        .then(post => {
            res.status(200).json(post);
        })
        .catch(err => {
            res.status(500).json({error: 'error retrieving post'})
        });
});

router.delete('/:pid', validatePostId, (req, res) => {
    const id = req.params.pid;
    db.remove(id)
        .then(post => {
            res.status(200).json(post);
        })
        .catch(err => {
            res.status(500).json({error: 'error removing post'})
        });
});

router.put('/:pid', validatePostId, (req, res) => {
    const id = req.params.pid;
    const changes = req.body;
    db.update(id, changes)
        .then(post => {
            res.status(201).json({post: `${id} successfully updated!`});
        })
        .catch(err => {
            res.status(500).json({error: 'error updating post'});
        });
});

// custom middleware

function validatePostId(req, res, next) {
    const id = req.params.pid;
    db.getById(id)
        .then(post => {
            if (post) {
                req.post = post;
                next();
            }
            else {
                res.status(400).json({message: 'invalid post id'});
            }
        })
        .catch (err => {
            res.status(500).json({error: 'There was an error accessing that post from the database.'})
        })
};

module.exports = router;