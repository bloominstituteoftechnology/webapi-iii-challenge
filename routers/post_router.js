const express = require('express');

/* Local Requires */
const postDB = require('../data/helpers/postDb');

/* Constant globals */
const router = express.Router();

/* Post CRUD Functions */
router.get('/', (req, res) => {
    postDB.get()
    .then((posts) => {
        res.status(200).json(posts);
    })
    .catch((error) => {
        res.status(500).json({errorMessage: error});
    })
})

router.get('/:id', (req, res) => {
    const {id} = req.params;
    postDB.get(id)
    .then((post) => {
        if (post) {
            res.status(200).json(post);
        }
        else {
            res.status(404).json({errorMessage: 'Post not found.'});
        }
    })
    .catch((error) => {
        res.status(500).json({errorMessage: error});
    })
})

router.post('/', (req, res) => {
    const newPost = req.body;
    if (newPost.userId && newPost.text) {
        postDB.insert(newPost)
        .then((newPostId) => {
            postDB.get(newPostId)
            .then((post) => {
                res.status(200).json(post);
            })
            .catch((error) => {
                res.status(500).json({error});
            })
        })
        .catch((error) => {
            res.status(500).json(error);
        })
    }
    else {
        res.status(400).json({message: `New posts must contain 'userId' and 'text' parameters.`});
    }
})

router.put('/:id', (req, res) => {
    const {id} = req.params;
    const updatedPost = req.body;

    if (updatedPost.userId && newPost.text) {
        postDB.get(id)
        .then((post) => {
            console.log(post)
            console.log(post.length);
            postDB
        })
    }
    else {
        res.status(400).json({message: `Updated posts must contain 'userId' and 'text' parameters.`})
    }
})

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    let deletedPost;
    postDB.get(id)
    .then((post) => {
        if (post) {
            deletedPost = post;
            postDB.remove(id)
            .then(() => {
                res.status(200).json(deletedPost);
            })
        }
        else {
            res.status(404).json({error: `Post id: ${id} not found`});
        }
    })
    .catch((error) => {
        res.status(500).json({errorMessage: error});
    })
})

module.exports = router;