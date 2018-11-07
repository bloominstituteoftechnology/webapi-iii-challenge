const express = require('express');
const router = express.Router();
const postDb = require('../helpers/postDb');


// All posts
router.get('/', (req, res) => {
    postDb
    .get()
    .then(posts => {
        res
        .status(200)
        .json(posts);
    })
    .catch(err => {
            res
            .status(500)
            .json({ error: "The posts information could not be retrieved."});
});
});


//post by ID
router.get('/:id', (req, res) => {
    postDb
    .get(req.params.id)
    .then(post => {
        res
        .status(200)
        .json(post);
    })
    .catch(err => {
            res
            .status(500)
            .json({ error: "The post information could not be retrieved.", errorMessage: err.message});
});
});


//get post tags
router.get('/:id/tags', (req, res) => {
    postDb
    .getPostTags(req.params.id)
    .then(tags => {
        if (tags.length ===0) {
            res.json({message: "id doesnt exist"})
        }
        res 
        .status(200)
        .json({tags})
    })
    .catch(error => {
        res.status(500).json({error: "post tag cannot be retrieved"})
    })
})


// Insert post 
router.post('/', (req, res) => {
    const {text, userId} = req.body;
    if (!text || !userId) {
        res.status(400).json({errorMessage: "Please provide text and userId for the post."})
        return;
    }
    postDb
        .insert({
            text, userId
        })
        .then(response => {
            res.status(201).json({text, userId});
        })
        .catch(error => {
            res.status(500).json({error: "There was an error while saving the post to the database" })
        })
});


//Update post
router.put('/:id', (req, res) => {
    const {id} = req.params;
    const {text} = req.body;
    if (!text) {
        res.status(400).json({errorMessage: "Please provide text and userId for the post."})
        return;
    }
    postDb
    .update(id, {text})
    .then(response => {
        if (response == 0) {
            res.status(404).json({message: "The post with the specified ID does not exist."})
            return;
        }
        res.status(200).json({text})
    })
    .catch(error => {
        res.status(500).json({error: "The post information could not be modified."})
        return;
    });
});


//Delete Post
router.delete('/:id', (req, res) => {
    const {id} = req.params;
    postDb
    .remove(id)
    .then(response => {
        if (!response) {
            res
            .status(404)
            .json({message: "The post with the specified ID does not exist."})
        }
        res
        .json({message:'Post removed from system!'})
    })
        .catch(error => {
            res
            .status(500)
            .json({error: "The post could not be removed"})
        })
});


module.exports = router;