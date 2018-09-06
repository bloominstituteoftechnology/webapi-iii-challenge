const users = require('../data/helpers/userDb.js');
const express=require('express');
const router=express.Router();

function upperCase(req, res, next) {
    req.body.name=req.body.name.toUpperCase();
    next();
  }

router.get('/',async (req,res)=>{
    try {
        const user=await(users.get());
        res.status(200).json(user);
    } catch(error) {
        res.status(500).json({error: "User(s) information could not be retrieved."})
    }
});
router.get('/:id',async(req,res)=>{
    try{
        const user=await (users.get(req.params.id));
        user===undefined?res.status(404).json({message:"The user with the specific ID does not exist"}):res.status(200).json(user);
    } catch(error){
        res.status(500).json({error:"User(s) information could not be retrieved"});
    }
})
router.post('/', upperCase, async(req,res)=>{
    const user=req.body;
    if (user) {
        try {
            const response=await users.insert(user);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: "There was an error while saving the user to the database" });
        }
       }   else {
        res.status(400).json({message: 'A user needs a name'});
    }
})
router.put('/:id', upperCase, async(req,res)=>{
    const user=req.body;
    if (user) {
        try {
            const response=await users.update(req.params.id,user);
            response===1?res.status(200).json(user):res.status(404).json({message:"The user with the specified ID does not exist"});
        }
        catch(error) {
            res.status(500).json({ error: "The user information could not be modified." })     
        }
    } else {
        res.status(400).json({errorMessage:"Please enter a user name"});
    }
})
router.delete('/:id',async(req,res)=>{
    try{
        const removed=await users.remove(req.params.id);
        removed===1?res.status(200).json({success: 'Deleted user.'}):
        res.status(404).json({message:"The user with the specified ID does not exist"});
    } catch(error) {
        res.status(500).json({error: "The user could not be removed" })
    }
})
module.exports=router;