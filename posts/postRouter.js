const express = require('express');
const router = express.Router();
const postHelper = require('../data/helpers/postDb')
const userHelper = require('../data/helpers/userDb')


router.get('/',async(req,res)=>{
    try {
        const response = await postHelper.get();    
        res.status(200).json(response)
    } catch (error) {
        res.status(500).send({message:error.toString()})
    }
})
router.get('/:id',async(req,res)=>{
    const { id } = req.params;
    try {
        const response = await postHelper.get(Number(id))
        res.status(200).json(response)
    } catch (error) {
        res.status(500).send({message:error.toString(),id})
    }
})
router.delete('/:id', async(req,res)=>{
    const { id } = req.params;
    try {
        const response = await postHelper.remove(id)
        if(response > 0){
            res.status(200).json({message:"Success: data has been deleted for", id})
        } else {
            res.status(404).send({message:"No data found for deletion", id})
        }
    } catch (error) {
        res.status(500).send({message:error, id})
    }
})
router.put('/:id',async(req,res)=>{
    if(req.body.userId)
    {
        try {
            const userExists = await userHelper.get(req.body.userId)
            if(userExists.id > 0){
                try {
                    const response = await postHelper.update(req.params.id,req.body)

                    if(response === 1){
                        try {
                            let post = await postHelper.get(req.params.id);
                            res.status(200).json(post)
                        } catch (error) {
                            res.status(500).json({message:error.toString()})          
                        }
                    }   
                     else {
                         res.status(404).json({message:"no post was found for update.",id})
                     }
                } catch (error) {
                    res.status(500).send({message:error.toString(), id})
                }
            } else {
                res.status(500).send({message:"Unable to update post, userid must be a valid user. "})
            }
        } catch (error) {
            res.status(500).send({message:error.toString()})
        }
    } else {
        res.status(500).send({message:"Unable to update post, userid is required. "})
    }
})
router.post('/',async(req,res)=>{
    if(req.body.userId && req.body.text)
    {
        try {
            const userExists = await userHelper.get(req.body.userId)
            if(userExists.id > 0){
                try {
                    const response = await postHelper.insert(req.body)
                    const post = await postHelper.get(response.id)
                    res.status(200).json(post);
                } catch (error) {
                    res.status(500).send({message:"Unable to insert new post, an error has occurred. ", id, error})
                }
            } else {
                res.status(500).send({message:"Unable to insert new post, userid must be a valid user. "})
            }
        } catch (error) {
            res.status(500).send({message:error.toString()})
        }
    } else {
        res.status(500).send({message:"Unable to insert new post, userid is required. "})
    }
})

module.exports = router