const express = require("express");

const router = express.Router();

const db = require('../data/helpers/tagDb')

router.get('/',(req,res)=>{
    db
    .get()
    .then(tags =>{
        res.json(tags)
    })
    .catch(error=>{
        res.status(500).json({error: "darn this error"})
    })
})

router.get('/:id', (req,res) =>{
    const { id } = req.params

    db
    .get(id)
    .then(tag=>{
    res.json(tag)
})
.catch(error =>{
    res.status(500).json({error: "darn this error"})
})

})
router.post('/',(req,res)=>{
    const tag = req.body;
    db
    .insert(tag)
    .then(response =>{
        res.json(response)
    })
    .catch(error =>{
        res.status(500).json({error: "darn this error"})
    })
})
router.delete('/:id', (req,res)=>{
    const { id } = req. params;
    let tag;

    db
    .get(id)
    .then(response =>{
        user = {...response[0]}
        db
        .remove(id)
        .then(response =>{
            res.status(200).json(user)
        })
    })
    .catch(err =>{
        res.status(500).json({error:"this darn error"});    
      }); 

})
router.put('/:id', (req,res)=>{
    const { id } = req.params
    const update = req.body;
    db
    .update(id, update)
    .then(count =>{

        if(count > 0){
            db
            .get(id)
            .then(tags =>{
            
                res
                .status(200)
                .json(tags[0]);
            })
        } else{
            res.status(400)
            .json({message:"this tag does not exist"})
        }
    })
    .catch(err=>{
        res.status(400).json({error: "There was an error while saving the tag to the database"});
    });
});
module.exports = router;