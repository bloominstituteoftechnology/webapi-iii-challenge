const express = require('express');

const Posts = require('./postDb.js');

const router = express.Router();

router.use((req, res, next) => {
    console.log('Hubs Router, whoo!')
    next();
  })

// this only runs if the url has /api/hubs in it
router.get('/', async (req, res) => {
    try {
        const posts = await Posts.get(req.query);
        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error retrieving the posts'
        });
    }
});

// /api/posts/:id
router.get('/:id', validatePostId, async (req, res) => {
    try {
        const post = await Posts.getById(req.params.id);

        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: 'post not found; invalid id' })
        }
    } catch (err) {
        res.status(500).json({ message: 'error retrieving post'})
    }    
});

router.post('/', async (req, res) => {
    const newPost = req.body;
    
    if (newPost) {
        try {
            const post = await Posts.insert(req.body);
            res.status(201).json(post);
        } catch (error) {
            console.log(error); 
                res.status(500).json({
                    message: 'Error adding the post'
                });
        } 
        } else {
            res.status(400).json({
                err: 'text property missing'
            });
    }        
});

router.delete('/:id', async (req, res) => {
    try {
        const count = await Posts.remove(req.params.id)
        if (count > 0) {
            res.status(200).json({ message: 'The post has been nuked' });
        } else {
            res.status(404).json({ message: 'The post could not be found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            message: 'Error removing post' 
        });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const post = await Posts.update(req.params.id, req.body);
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: 'The post could not be found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error updating the post'
        });
    }
});

// custom middleware

async function validatePostId(req, res, next) {
    try {
        const { id } = req.params;
        const hub = await Posts.getById(id);
        if (post) {
            req.post = post;
            next();
        } else {
            res.status(404).json({ message: "post not found; invalid id" });
        }
    } catch (err) {
        res.status(500).json({ 
            message: 'failed to validate id'
        })
    }
};

module.exports = router;