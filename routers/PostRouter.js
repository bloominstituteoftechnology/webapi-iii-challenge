const express = require('express');
const router = express.Router();
const postDb = require('../data/helpers/postDb');

// ALL POST RELATED STUFF -----------------------------------------------------------------------------------------------------------
router.get('/', (req, res) => {
    postDb.get().then(posts => {
        res.status(200).json(posts);
    }).catch(err => {
        res.status(500).json({error: "The posts information could not be retrieved."})
    })
})

router.get('/:id', (req,res) => {
    const id = req.params.id;
    postDb.get(id)
        .then(post => {
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({message: "The post with the specified ID does not exist."});
            }
        })
        .catch(err => {
            res.status(500).json({error: "The post information could not be retrieved."});
        })
});

router.post('/', (req,res) => {
    const {userId, text} = req.body;
    if (!userId || !text) {
        res.status(400).json({message: "Please provide a User ID and text body for the post"});
    } else {
        postDb.insert(req.body).then(post => {
            postDb.get(post.id)
                .then(post => res.status(201).json(post))
                .catch(err => res.status(404).json({message: "The post with the specified ID does not exist."}));
        }).catch(err => {
            res.status(500).json({message: "There was an error while saving the post to the database"})
        })
    }
})

router.delete('/:id', (req,res) => {
    postDb.remove(req.params.id).then(count => {
        if (count) {
            res.status(200).json(count);
        }
        else {
            res.status(404).json({message: "The post with the specified ID does not exist."});
        }
    }).catch(err => {
        res.status(500).json({error: "The post could not be removed"});
    })
})

router.put('/:id', (req,res) => {
    const {userId, text} = req.body;
    if (!userId || !text) {
        res.status(400).json({message: "Please provide a User ID and text body for the post"});
    } else {
        postDb.update(req.params.id, req.body).then(count => {
            if (count) {
                postDb.get(req.params.id)
                    .then(post => res.status(200).json(post))
                    .catch(err => res.status(404).json({message:"The post with the specified ID does not exist."}));
            }
            else {
                res.status(404).json({message: "The post with the specified ID does not exist."});
            }
        }).catch(err => {
            res.status(500).json({message: "There was an error while saving the post to the database"})
        })
    }
})

module.exports = router;