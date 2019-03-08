// import express, define router, and define db
const express = require('express');
const router = express.Router();
const db = require('../helpers/postDb');

// import middleware
const numberIdCheck = require('../middleware/numberIdCheck');

// Create/post logic
router.post('/', (req, res) => {
    const { userId } = req.body
    const { text } = req.body
    if (numberIdCheck(userId) && typeof text === 'string') { 
        const post = req.body;
        db
            .insert(post) 
            .then(newPost => {
                res
                    .status(201)
                    .json(newPost)
                })
                .catch(err => { res.status(500).json({ err: 'unable to add post...' }) })
        } else if (!numberIdCheck(userId)) {
            res
                .status(400)
                .json({ err: 'Bad userId, required - must be integer!'});
        } else {
            res
                .status(500)
                .json({ err: 'failed to add post...' });
        }
})

// Read/get logic
router.get('/', (req, res) => {
    db
        .get() // retrieve all posts
        .then( posts => {
            console.log(posts); // posts is an array of objects!
            res.status(200).json(posts);
        })
        .catch(err => {
            res
                .status(500)
                .json({ err: 'Failed to retrieve posts'});
    });
});

router.get('/:id', (req, res) => { // retrieve post by id
    const id = req.params.id; // set variable for id of get request object
    if (numberIdCheck(id)) {
        db
            .get(id)
            .then(post => {
                if (post) {
                    console.log(post); // returns looked up user object
                    res
                        .status(200)
                        .json(post);
                    } else if (!post) {
                        res
                            .status(404)
                            .json({ err: 'Post ID not found in DB (ID cannot be located)'});
                    }
                }
            ).catch(err => { res.status(500).json({ err: 'Cannot retrieve post...' })});
    } else if (!numberIdCheck(id)) {
        res
            .status(404)
            .json({ err: 'Post ID not found in db! (invalid or is not an integer)' });
    } else {
        res
        .status(500)
        .json({ err: 'Cannot retrieve Post...' });
    }
})

router.get('/:id/tags', (req, res) => {
    const { id } = req.params;
    if (numberIdCheck(id)) {
        db
            .getPostTags(id)
            .then(tags => {
                console.log(tags)
                if (tags) {
                    res
                        .status(200)
                        .json(tags);
                } else if (!tags) {
                    res
                        .status(404)
                        .json({err: `Tags associated with post ${id} not found. (Poster not found)`})
                        .catch(err => { res.status(500).json({err: 'Server failed to get tags from post...'})});
                }
            })
            .catch(err => { res.status(500).json({err: 'Server failed to get tags from post...'})});
    } else {
        res.status(500).json({err: 'Server failed to get tags from post...'});
    }
})

// Update/put logic
router.put('/:id', (req, res) => {
    const changes = req.body; // specify object used to update existing user
    const id = req.params.id; // specify id
    if (numberIdCheck(id)) { // use middleware to check for loose equality of id to integer
        db
            .update(id, changes)
            .then(count => {
                res
                    .status(200)
                    .json(count);
            }).catch(err => { res.status(500).json({ err: 'Could not update post...' }) })
    } else if (!numberIdCheck(id)) {
        res
            .status(404)
            .json({ message: 'ID is not valid (not an integer)' });
    } else { res.status(500).json({ message: 'error updating user' })}
})

// Delete/remove logic
router.delete('/:id', (req, res) => {
    const { id } = req.params
    if (numberIdCheck(id)) { 
        db
            .remove(id)
            .then(count => {
                if (count) {
                    res
                    .status(200)
                    .json(count);
                } else if (!count) {
                    res
                        .status(404)
                        .json({ message: 'id is not valid (post not found)' });
                }
            })
            .catch(err => { res.status(500).json({ message: 'failed to remove post...' }) })
        } 
    
    res
        .status(500)
        .json({ message: 'Error removing post..' })
})
module.exports = router; // Export the route