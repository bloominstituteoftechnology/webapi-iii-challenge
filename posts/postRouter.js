const express = require('express');

const dbPost = require('../data/helpers/postDb.js');
const dbUser = require('../data/helpers/userDb.js');

const router = express.Router();

// middleware

// endpoints

// /api/users/posts
router.get('/:id', (req, res) => {
    const {id} = req.params;
    dbUser.getUserPosts(id)
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(error => {
        res.status(404).json({error: "USER NOT FOUND"})
    })
})


// /api/users/posts/:id
router.post('/:id', async (req,res) => {
    try {
        const postData = req.body;
        const postId = await dbPost.insert(postData);
        res.status(201).json(postId);
    } catch(error) {
        res.status(500).json({message: "The post could not be added"}, error)
    }
})


//  /api/users/posts/:userId/:postId
router.put('/:userId/:postId', (req, res) => {
    const postData = req.body;
    if (!postData.text) {
        res.status(400).json({errorMessage: "Please provide text." })
    } else {
        dbPost.update(req.params.postId, postData).then(count => {
        if(count) {
            res.status(200).json({message: `${count} post updated`})
        } else {
            res.status(404).json({error: "Post not found"})
        }
    }).catch(error => {
        res.status(400).json({message: "Post could not be updated"})
    })
    }
})

 
//  /api/users/posts/:userId/:postId
router.delete('/:userId/:postId', async (req, res) => {
    const removeUser = await dbPost.remove(req.params.postId);
    try {
        res.status(201).json(removeUser)
    } catch (error) {
        res.status(500).json({message: "Post could not be removed"})
    }
})


module.exports = router;
