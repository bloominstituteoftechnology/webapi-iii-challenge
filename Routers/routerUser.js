const express = require("express");

const router = express.Router();

const db = require('../data/helpers/userDb')

router.get('/',(req,res)=>{
    db
    .get()
    .then(users =>{
        res.json(users)
    })
    .catch(error=>{
        res.status(500).json({error: "darn this error"})
    })
})

router.get('/:id', (req,res) =>{
    const { id } = req.params

    db
    .get(id)
    .then(user=>{
    res.json(user)
})
.catch(error =>{
    res.status(500).json({error: "darn this error"})
})

})
router.post('/',(req,res)=>{
    const user = req.body;
    db
    .insert(user)
    .then(response =>{
        res.json(response)
    })
    .catch(error =>{
        res.status(500).json({error: "darn this error"})
    })
})
router.delete('/:id', (req,res)=>{
    const { id } = req. params;
    let user;
    db
    .get(id)
    .then(response =>{
        user ={...response[0]}
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
            .then(users =>{
            
                res
                .status(200)
                .json(users[0]);
            })
        } else{
            res.status(400)
            .json({message:"this post does not exist"})
        }
    })
    .catch(err=>{
        res.status(400).json({error: "There was an error while saving the user to the database"});
    });
});
module.exports = router;