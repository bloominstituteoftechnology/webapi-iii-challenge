const express = require('express');
const db = require('./postDb')

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const allPosts = await db.get()
        res.status(200).json(allPosts)
    } catch (error) {
        res.status(500).json({ message: 'There was an error getting all users from the database'})
    }
});

router.get('/:id', validatePostId, async (req, res) => {
    const id = req.post

    try {
        res.status(200).json(id)
    } catch (error) {
        res.status(500).json({ message: 'There was an error getting user by id'})     
    }    
});

router.delete('/:id', validatePostId, async (req, res) => {
    const { id } = req.post

    try {
        const deletedPost = await db.remove(id)
        res.status(200).json({ message: `Successfully deleted post with id ${id}`, deletedPost})
    } catch (error) {
        res.status(500).json({ message: 'There was an error deleting post'})
    }
});

router.put('/:id', validatePostId, async (req, res) => {
    const { id, user_id } = req.post
    const newPost = req.body

    try {
        const updatedPost = await db.insert(id, { id, ...newPost, user_id})
        res.status(200).json({ message: `Successfully updated post with id ${id}`, updatedPost})
    } catch (error) {
        res.status(500).json({ error: 'There was an error updating post', error})
    }
});

// custom middleware

async function validatePostId(req, res, next) {
    const { id } = req.params;
    try {
        const post = await db.getById(id);
        if (post) {
            req.post = post;
        } else {
            res.status(400).json({ message: 'invalid post id' });
        }
    } catch (error) {
        res.status(500).json({
            error: 'There was an error validating post by id'
        });
    }
    next();
};

function errorMessage(err, req, res, next) {

}

module.exports = router
