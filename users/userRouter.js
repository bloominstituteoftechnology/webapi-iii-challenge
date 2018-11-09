const express = require('express');
const router = express.Router();
const userHelper = require('../data/helpers/userDb')

function uppercase(req,res,next){
    req.body.name = req.body.name.toUpperCase();
    next();
}


router.get('/',(req,res)=>{
    userHelper.get()
        .then(response => res.status(200).json(response))
        .catch(error=> res.status(500).json({message:error.toString()}));
})
router.get('/:id',(req,res)=>{
    const { id } = req.params;
    userHelper.get(id)
        .then(response => {
            if(response){ 
                res.status(200).json(response)
            } else {
                res.status(404).send({errorMessage:"Unable to find the user by id ", id})
            }
        })
        .catch(error=>res.status(500).json({message:error.toString()}));
})
router.delete('/:id',(req,res)=>{
    const { id } = req.params;
    userHelper.remove(id)
        .then(response =>{
            if(response > 0){
                res.status(200).json({message:"Success: data has been deleted for", id})
            } else {
                res.status(404).send({message:"No data found for deletion", id})
            }
        })
        .catch(error=> res.status(500).json({message:error.toString()}));
})
router.post('/',uppercase,(req,res)=>{
    if(req.body.name && req.body.name.length < 129){
        userHelper.insert(req.body)
            .then(response=>{
               
                userHelper.get(response.id)
                    .then(user=>{
                            res.status(201).json(user)
                        })
                    .catch(error => res.status(500).json({message:error}))

            })
            .catch(error=>res.status(500).json({message:error.toString()}));
    } else  {
        res.status(400).send({message:"Name is required and cannot exceed 128chars "})
    }
})
router.put('/:id',uppercase, async (req,res)=>{
    const { id } = req.params;

    if(req.body.name && req.body.name.length < 129){
        try {
            let response = await userHelper.update(id,req.body)
            if(response === 1)
            {
                let user = await userHelper.get(id)
                res.status(200).json(user)
            } else 
            {
                res.status(404).json({message:'user not found for update'})
            }
        } catch (error) {
            res.status(500).json({message:error.toString()})            
        }
    } else  {
        res.status(400).send({message:"Name is required and cannot exceed 128chars "})
    }    
})

module.exports = router;