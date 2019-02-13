const express = require('express');
const router = express.Router();

const PostFuncs = require('../helpers/postDb.js')

router.get('/', async (req, res) => {
    const posts = await PostFuncs.get();
    try {
        res.status(200).json(posts)
    } catch(err) {
        console.log(err)
        res.status(500).json({ message: 'Error retrieving posts'})
    }
});

router.get('/:id', async (req, res) => {
    const posts = await PostFuncs.getById(req.params.id);
    try {
        res.status(200).json(posts)
    } catch(err) {
        console.log(err)
        res.status(500).json({ message: 'Error retrieving posts'})
    }
});

router.post('/', async (req, res) => {
    const newPost = await PostFuncs.insert(req.body);

    try {
        res.status(201).json({newPost})
    } catch(err) {
        console.log(err)
        res.status(500).json({ message: 'Error adding post'})
    }
});

router.put('/:id', async (req, res) => {
    try {
        if (!req.body.text) {
            return res.status(400).json({ errorMessage: "Please provide text for the post." })
        }
        const post = await PostFuncs.update(req.params.id, req.body)

        if(post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({ message: 'This post could not be found.'})
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Error updating the post'
        })
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const post = await PostFuncs.remove(req.params.id)
        if (post > 0) {
            res.status(200).json({ message: "This post has been deleted"})
        } else {
            res.status(404).json({ message: "Could not find post with this ID."})
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'Error deleting the post'
        })
    }
});
module.exports = router;