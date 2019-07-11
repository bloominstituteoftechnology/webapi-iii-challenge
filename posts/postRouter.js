const express = 'express';
const Posts = require('./postDb')

const router = express.Router();

router.get('/', async (req, res) => {
    try{
        const posts = await Posts.get();
        res.status(200).json(posts);
    }
    catch(error){
        res.status(500).json({error: "Server error"});
    }
});

router.get('/:id', validatePostId, async (req, res) => {
    try{
        const post = await Posts.getById(req.params.id);
        if(post){
            res.status(200).json(post);
        }
        else{
            res.status(404).json({message: "No post found for this ID"});
        }
    }
    catch(error){
        res.status(500).json({error: "Server error"});
    }
});

router.delete('/:id', validatePostId, async (req, res) => {
    try{
        const count = await Posts.remove(req.params.id);
        if(count > 0){
            res.status(200).json({message: "Post has been deleted successfully"})
        }
        else{
            res.status(404).json({message: "There is no post with this id"})
        }
    }
    catch(error){
        res.status(500).json({error: "Server error"});
    }
});

router.put('/:id', validatePostId, async (req, res) => {
    try{
        const post = await Posts.update(req.body);
        if(post){
            res.status(204).json(post);
        }
        else{
            res.status(404).json({message: "There is no post with this id"})
        }
    }
    catch(error){
        res.status(500).json({error: "Server error"});
    }
});

// custom middleware

async function validatePostId(req, res, next) {
    const post = await Posts.getById(req.params.id);
    if(post){
        req.post = post;
    }
    else{
        res.status(400).json({ message: "invalid post id" });
    }
    next();
};

module.exports = router;