const express = require('express');

const { getTagToUpperCase } = require('../middlewares');
const db = require('../data/helpers/postDb.js');

const router = express.Router();

router.get('/', (req, res) => {
    db
    .get()
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(err => {
        res.status(500).json({ error: `Error fetching posts` })
    });
});

router.get('/:id', getTagToUpperCase, (req, res) => {
    const { id } = req.params;
    db
    .get(id)
    .then(post => {
        if(post.length === 0) {
            res.status(404).json({ error: `Post with id ${id} not found` });
        } else {
            res.status(200).json(post);
        }
    })
    .catch(err => {
        res.status(500).json({ error: `Error fetching post with id ${id}` })
    });
});

router.get('/:id/tags', getTagToUpperCase, (req, res) => {
    const { id } = req.params;
    db
    .getPostTags(id)
    .then(tags => {
        if(tags.length === 0) {
            res.status(404).json({ error: `No Tags found for post with id ${id}` });
        } else {
            res.status(200).json(tags);
        }
    })
    .catch(err => {
        res.status(500).json({ error: `Error fetching tags for post with id ${id}` })
    });
});

router.post('/', (req, res) => {
    const { userId, text } = req.body;
    const post = { userId, text };
    if(!userId || !text) {
        res.status(400).json({ error: `Please provide a valid userId and text for the post.`});
    } else {
        db.get(userId)
        .then(user => {
            if(user.length === 0){
                res.status(404).json({ error: `No user found with id ${userId}` })
            } else {
                db.insert(post)
                .then(post => {
                    res.status(201).json(post);
                })
                .catch(err => {
                    res.status(500).json({ error: `There was an error creating the post.` });
                })
            }
        })
        .catch(err => {
            res.status(500).json({ error: `There was an error finding the user with id ${userId}`})
        })
    }
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { userId, text } = req.body;
    const updatedPost = { userId, text };
    if(!userId || !text) {
        res.status(400).json({ error: `Please provide a valid userId and text for the post.`});
    } else {
        db.update(id, updatedPost)
        .then(count => {
            if(count === 0) {
                res.status(404).json({ error: `Post with id ${id} not found.`})
            } else {
                res.status(200).json(count);
            }
        })
        .catch(err => {
            res.status(500).json({ error: `There was an error updating the post with id ${id}` });
        })
    }
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.remove(id)
    .then(count => {
        if(count === 0) {
            res.status(404).json({ message: `The post with id ${id} was not found.`});
        } else {
            res.status(200).json(count);
        }
    })
    .catch(err => {
        res.status(500).json({ error: `Error deleting the post with id ${id}` })
    })
})

module.exports = router;