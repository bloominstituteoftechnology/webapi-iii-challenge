const express = require('express');
const router = express.Router();

const Users = require('../data/helpers/userDb');
const Posts = require('../data/helpers/postDb');

// GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET // GET 
router.get('/', async (req, res) => {
    try {
        const posts = await Posts.get();
        res.status(200).json(posts);
    }catch (error) {
        console.log(error);
        res.status(500).json({message:'error getting the post!'});
    }
});
router.get('/:id', async (req, res) => {
    try {
        const post = await Posts.getById(req.params.id);
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({message: 'post not found'});
        }
    }catch (error) {
        console.log(error);
        res.status(500).json({message:'error getting the post!'});
    }
});

// POST // POST // POST // POST // POST // POST // POST // POST // POST // POST // POST // POST // POST // POST // POST // POST // POST // POST // POST 
router.post('/', async (req, res) => {
    if (!req.body.text || req.body.text === '' || !req.body.user_id) {
        res.status(400).json({message:'Please provide valid text and user id'})
    }
    try {
        const post = await Posts.insert({text: req.body.text, user_id: req.body.user_id});
        res.status(201).json(post);
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'error adding the post!'});
    }
});

// DELETE // DELETE // DELETE // DELETE // DELETE // DELETE // DELETE // DELETE // DELETE // DELETE // DELETE // DELETE // DELETE // DELETE // DELETE 
router.delete('/:id', async (req, res) => {
    try {
        const count = await Posts.remove(req.params.id);
        if (count > 0) {
            res.status(200).json({message: 'The post has been deleted'});
        } else {
            res.status(404).json({message: 'The post could not be found'});
        } 
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'error removing the user.'});
    }
});

// PUT // PUT // PUT // PUT // PUT // PUT // PUT // PUT // PUT // PUT // PUT // PUT // PUT // PUT // PUT // PUT // PUT // PUT // PUT // PUT // PUT // 
router.put('/:id', async (req, res) => {
    try {
        const post = await Posts.update(req.params.id, req.body);
        if(post) {
            res.status(200).json(post);
        }else {
            res.status(404).json({message: 'post could not be found'});
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'error updating the post.'});
    }
})


module.exports = router;