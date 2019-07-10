const express = require("express");
const Posts = require("./postDb");
const router = express.Router();

// custom middleware

const validatePostId = async (req, res, next) => {
    const postId = req.params.id;
    const currentPost = await Posts.getById(postId);
    if(!postId || isNaN(parseInt(postId, 10)) || !currentPost){
        res.status(400).json({errorMessage: 'invalid post id'})
    }
    else {
        req.post = currentPost;
        next();
    }
};


router.get('/', async (req, res) => {
    try{
        const allPost = await Posts.get();
        res.status(200).json(allPost)
    }
    catch(error){
        res.status(500).json({ errorMessage: "The Posts data could not be retrieved." });
    };
});

router.get('/:id', validatePostId, async (req, res) => {
    const postId = req.params.id;
    try{
        res.status(200).json(req.post)
    }
    catch(error){
        res.status(500).json({ errorMessage: "The post data could not be retrieved." });
    }
});

router.delete('/:id', validatePostId, async (req, res) => {
    const postId = req.params.id;
    try{
        await Posts.remove(postId);
        res.status(200).json(req.post)
    }
    catch(error){
        res.status(500).json({ errorMessage: "The post could not be deleted." });
    }
});

router.put('/:id', validatePostId, async (req, res) => {
    const postId = req.params.id;
    const text = req.body.text;
    try{
        await Posts.update(postId, {text});
        const updatedPost = await Posts.getById(postId);
        res.status(200).json(updatedPost)
    }
    catch(error){
        res.status(500).json({ errorMessage: "The post could not be updated." });
    }
});



module.exports = router;