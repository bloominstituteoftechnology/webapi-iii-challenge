const posts=require('../data/helpers/postDb.js');
const users = require('../data/helpers/userDb.js');
const express=require('express');
const router=express.Router();

router.get('/',async(req,res)=>{
    try {
        const allPosts=await posts.get();
        res.status(200).json(allPosts);
    } catch(error) {
        res.status(500).json({error:'Posts could not be retrieved.'});
    }
});
router.get('/:id',async(req,res)=>{
    try {
        const userPosts=await users.getUserPosts(req.params.id);
        res.status(200).json(userPosts);
    } catch(error) {
        res.status(500).json({error:'Posts could not be retrieved'});
    }
});
router.post('/:id',async(req,res)=>{
    const postBody=req.body;
    postBody.userId=req.params.id;
    if (postBody.text) {
        try {
            const response=await posts.insert(postBody);
            res.status(201).json(response);
        } catch (error) {
            res.status(500).json({ error: "There was an error while saving the post to the database" });
        }}  else {
        res.status(400).json({message: 'Posts need both a text field completed.'});
        }
})
router.delete('/:postId',async(req,res)=>{
    try {
        const removedPost=await posts.remove(req.params.postId);
        removedPost===1?res.status(200).json({success:'Deleted post.'})
        :res.status(404).json({message:"The post with the specified ID does not exist"});
    } catch(error){
        res.status(500).json({error:'The post could not be removed'});
    }
})
router.put('/:postId', async(req,res)=>{
    const postBody=req.body;
    if (postBody) {
        try {
            const response=await posts.update(req.params.postId,postBody);
            response===1?res.status(200).json(postBody):
            res.status(404).json({message:"The post with the specified ID does not exist"});
        }
        catch (error) {
            res.status(500).json({ error: "The post information could not be modified." })     
        }
    } else {
        res.status(400).json({errorMessage:"Please enter text"});
    }
})
module.exports=router;