const express = require('express');
const router = express.Router();
const postDB = require('../data/helpers/postDb')

router.use(express.json());

router.get('/', (req, res) => {
    postDB.get()
    .then(posts => {
        res.json(posts)
    })
    .catch(err => {
        res.status(500).json({message: 'Error getting posts'})
    })
});

router.get('/:id', (req, res) => {
    const {id} = req.params;
    postDB.get(id)
    .then(post => {
        if(post) {
            res.json(post)
        } else {
            res.status(404).json({message: 'post ID does not exist'})
        }
    })
    .catch(err => {
        res.status(500).json({message: 'Error finding post'})
    })
});

router.post('/', (req, res) => {
    const post = req.body;
    if(post.text && post.userId) {
        postDB.insert(post)
        .then(idInfo => {
            postDB.get(idInfo.id)
            .then(post => {
                    res.status(201).json(post)
            })
        })
        .catch(err => {
            res.status(500).json({message: 'Error creating post'})
        })
    }
});

router.delete('/:id', (req, res) => {
    const {id} = req.params;

    postDB.remove(id)
    .then(count => {
        if(count) {
            res.json({message: 'Post deleted'})
        } else {
            res.status(404).json({message: 'Post ID does not exist'})
        }
    })
    .catch(err => {
        res.status(500).json({message: 'Error deleting post'})
    })
})

router.put('/:id', (req, res) => {
    const post = req.body;
    const {id} = req.params;

    if(post.text && post.userId) {
        postDB.update(id, post)
        .then(count => {
            if(count) {
                postDB.get(id)
                .then(post => {
                    res.json(post)
                })
            } else {
                res.status(404).json({message: 'That post ID does not exist'})
            }
        })
        .catch(err => {
            res.status(500).json({message: 'Error updating Post'})
        })
    } else {
        res.status(400).json({message: 'please provide text and userId'})
    }
})  

module.exports = router;